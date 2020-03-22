// import App from 'next/app'
import '../resources/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';
import React from 'react';
import Router from 'next/router';
import App, { Container } from 'next/app';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChnageStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChnageComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChnageError triggered');
  NProgress.done();
};

export default class MyApp extends App {}