import NProgress from 'nprogress';
import './nprogress.scss';

const init = () => {
    NProgress.configure({
        minimum: 0.08,
        easing: 'linear',
        positionUsing: '',
        speed: 200,
        trickle: true,
        trickleSpeed: 200,
        showSpinner: false,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: 'body',
        template: '<div class="bar" role="bar">' + 
                    '<div class="peg"></div>' + 
                  '</div>' + 
                  '<div class="spinner" role="spinner">' + 
                    '<div class="spinner-icon"></div>' + 
                  '</div>'
    });
    return NProgress;
};

export default init();