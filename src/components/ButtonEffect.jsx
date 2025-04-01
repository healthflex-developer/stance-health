import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ButtonEffect = () => {
  const router = useRouter();

  useEffect(() => {
    const applyEffect = () => {
      document.querySelectorAll('.main-btn').forEach(button => {
        const text = button.textContent.trim().split('').map(char => {
          if (char === ' ') {
            return '&nbsp;';
          }
          return char;
        }).join('</i><i>');
        button.innerHTML = `<span><i>${text}</i></span>`;
      });
    };

    // Apply the effect on the initial load
    applyEffect();

    // Apply the effect on route change complete
    router.events.on('routeChangeComplete', applyEffect);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', applyEffect);
    };
  }, [router.events]);

  return null;
};

export default ButtonEffect
