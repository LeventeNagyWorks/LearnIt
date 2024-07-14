/* eslint-disable no-unused-vars */
import React from 'react'
import { signal } from "@preact/signals-react";
import LoadingScreen from './components/LoadingScreen';

const isLoading = signal({ _l: false });
const isStudyLoading = signal({ _l: false });
const isStudySetAccepted = signal({ _a: false });
const showSuccessfullyAdded = signal(false);
const showNotAcceptableFileErrorMessage = signal(false);
const showOnlyFav = signal(false);
const studySetsData = signal([]);

export {
    isLoading,
    isStudyLoading,
    isStudySetAccepted,
    showSuccessfullyAdded,
    studySetsData,
    showOnlyFav,
    showNotAcceptableFileErrorMessage
}