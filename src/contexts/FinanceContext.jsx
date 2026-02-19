import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    updateDoc
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const FinanceContext = React.createContext();

export function useFinance() {
    return useContext(FinanceContext);
}

export function FinanceProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            setTransactions([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "transactions"),
            where("uid", "==", currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(doc.data().date)
            }));

            // Sort by date desc (newest first)
            docs.sort((a, b) => b.date - a.date);

            setTransactions(docs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching transactions:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    function addTransaction(transaction) {
        return addDoc(collection(db, "transactions"), {
            ...transaction,
            uid: currentUser.uid,
            date: new Date(transaction.date) // Ensure date is a Date object
        });
    }

    function deleteTransaction(id) {
        return deleteDoc(doc(db, "transactions", id));
    }

    function updateTransaction(id, updatedTransaction) {
        return updateDoc(doc(db, "transactions", id), {
            ...updatedTransaction,
            date: new Date(updatedTransaction.date)
        });
    }

    const value = {
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction
    };

    return (
        <FinanceContext.Provider value={value}>
            {!loading && children}
        </FinanceContext.Provider>
    );
}
