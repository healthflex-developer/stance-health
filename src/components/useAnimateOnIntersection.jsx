// components/useAnimateOnIntersection.js
import { useEffect } from 'react';

const useAnimateOnIntersection = (selectors, threshold = 0.5) => {
  useEffect(() => {
    const processNode = (node, parentElem) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/); // Split text node by spaces while keeping spaces
        words.forEach((word) => {
          if (/\s/.test(word)) {
            // Append space directly without wrapping
            parentElem.innerHTML += word;
          } else {
            // Wrap each word in <p><i>
            parentElem.innerHTML += `<p><i>${word}</i></p>`;
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const newElem = node.cloneNode(false);
        parentElem.appendChild(newElem);

        Array.from(node.childNodes).forEach((childNode) => {
          processNode(childNode, newElem);
        });
      }
    };

    const animateElements = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elem = entry.target;
          const childNodes = Array.from(elem.childNodes);

          elem.innerHTML = '';

          childNodes.forEach((node) => {
            processNode(node, elem);
          });

          const children = elem.querySelectorAll('p > i');
          children.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.1}s`;
          });

          observer.unobserve(elem);
        }
      });
    };

    const observer = new IntersectionObserver(animateElements, { threshold });

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(elem => {
        observer.observe(elem);
      });
    });

    return () => {
      observer.disconnect();
    };
  }, [selectors, threshold]);
};

export default useAnimateOnIntersection
