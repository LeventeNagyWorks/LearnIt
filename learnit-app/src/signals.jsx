/* eslint-disable no-unused-vars */
import React from 'react';
import { signal } from '@preact/signals-react';

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
const isLoadingEnabled = signal(true);
const isProfileFocused = signal(false);
const sessionLength = signal(10);
const studySetsData = signal([]);
const isLoggedIn = signal(false);
const isFriendsOpened = signal(false);
const isMyFriendsOpened = signal(true);
const isAddFriendsOpened = signal(false);
const isPendingOpened = signal(false);
const isMyFriendsHovered = signal(false);
const isAddFriendsHovered = signal(false);
const isPendingHovered = signal(false);
const showDeleteWarningPopup = signal(false);
const showDeleteQuestionWarningPopup = signal(false);
const showAddNewQuestion = signal(false);
const showAddNewStudyset = signal(false);
const refreshStudySetsData = signal(0);
const studysetSelected = signal({});
const selectedStudysetNum = signal(0);

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
  isLoadingEnabled,
  sessionLength,
  isProfileFocused,
  isLoggedIn,
  isFriendsOpened,
  isMyFriendsHovered,
  isAddFriendsHovered,
  isPendingHovered,
  isMyFriendsOpened,
  isAddFriendsOpened,
  isPendingOpened,
  showDeleteWarningPopup,
  refreshStudySetsData,
  showAddNewQuestion,
  showAddNewStudyset,
  showDeleteQuestionWarningPopup,
  studysetSelected,
  selectedStudysetNum,
};
