/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { isLoading } from '../signals';
import { Link, useNavigate } from "react-router-dom";

export default function LoadingScreen() {
  return (
    <div className={`absolute w-full h-screen bg-cstm_bg_dark flex justify-center items-center font-poppins font-medium text-cstm_white text-5xl select-none duration-500 ${isLoading.value._l ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <h3>Loading Screen</h3>
    </div>
  )
}

export function Animated_link({
    children,
    className,
    onClick,
    to,
  }) {
    const navigate = useNavigate();
    return (
      <Link
        className={`cursor-pointer ${className}`}
        to={to}
        onClick={e => {
          e.preventDefault();
          if (onClick) onClick();
          NavigateTo(navigate, to);
        }}
      >
        {children}
      </Link>
    );
  }

  export function NavigateTo(navigate, to) {
    const currentPath = window.location.pathname;
  
    if (currentPath == to) {
      isLoading.value = { ...isLoading.value, _l: true };
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        Close_loading();
      }, 700);
    } else {
      isLoading.value = { ...isLoading.value, _l: true };
      setTimeout(() => navigate(to), 700);
    }
  }
  
  export function Close_loading() {
    console.log('run2');
    isLoading.value = { ...isLoading.value, _l: false };
  }

