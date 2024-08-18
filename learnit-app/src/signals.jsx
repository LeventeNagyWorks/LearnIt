/* eslint-disable no-unused-vars */
import React from 'react'
import { signal } from "@preact/signals-react";

const isLoading = signal({ _l: false });
const isStudyLoading = signal({ _l: false });
const isStudySetAccepted = signal({ _a: false });
const showSuccessfullyAdded = signal(false);
const showNotAcceptableFileErrorMessage = signal(false);
const showOnlyFav = signal(false);
const toggleDropBox = signal(true);
const startTransitionFromStudySets = signal(false);
const startTransitionToStudySets = signal(false);
const startTransitionFromStudySetDetail = signal(false);
const startTransitionToStudySetDetail = signal(false);
const isLoadingEnabled = signal(false);
const studySetsData = signal([]);

export {
    isLoading,
    isStudyLoading,
    isStudySetAccepted,
    showSuccessfullyAdded,
    studySetsData,
    showOnlyFav,
    showNotAcceptableFileErrorMessage,
    startTransitionFromStudySets,
    startTransitionToStudySets,
    startTransitionFromStudySetDetail,
    startTransitionToStudySetDetail,
    toggleDropBox,
    isLoadingEnabled
}