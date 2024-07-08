/* eslint-disable no-unused-vars */
import React from 'react'
import { signal } from "@preact/signals-react";
import LoadingScreen from './components/LoadingScreen';

const isLoading = signal({ _l: false });
const isStudyLoading = signal({ _l: false });

export {
    isLoading,
    isStudyLoading
}