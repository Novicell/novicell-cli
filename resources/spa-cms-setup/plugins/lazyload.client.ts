import NovicellLazyLoad from 'novicell-lazyload';
// import debounce from 'lodash/debounce';

const lazy = new NovicellLazyLoad({
  includeWebp: true, // optional
});

document.addEventListener(
  'lazybeforeunveil',
  event => {
    lazy.lazyLoad(event);
  },
  true,
);

window.addEventListener(
  'resize',
  () => {
    lazy.checkImages();
  },
  false,
);
