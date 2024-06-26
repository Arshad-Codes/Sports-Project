import { useInView } from 'react-intersection-observer';
import 'animate.css';
import './animate.css';
import LottiePage from './LottiePage';

const WhyRuhunaSport = () => {
  const { ref: containerRef, inView: containerInView } = useInView({
    triggerOnce: true,
  });
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
  });
  const { ref: ulRef, inView: ulInView } = useInView({ triggerOnce: true });
  const { ref: li1Ref, inView: li1InView } = useInView({ triggerOnce: true });
  const { ref: li2Ref, inView: li2InView } = useInView({ triggerOnce: true });
  const { ref: li3Ref, inView: li3InView } = useInView({ triggerOnce: true });
  const { ref: li4Ref, inView: li4InView } = useInView({ triggerOnce: true });
  const { ref: li5Ref, inView: li5InView } = useInView({ triggerOnce: true });
  const { ref: li6Ref, inView: li6InView } = useInView({ triggerOnce: true });
  const { ref: li7Ref, inView: li7InView } = useInView({ triggerOnce: true });

  return (
    <div className="mt-10 bg-gray-100 pt-5 px-5 rounded-lg shadow-md">
      <h2
        ref={headerRef}
        className={`text-2xl font-bold text-customGreen mb-4 ${
          headerInView ? 'animate__animated animate__fadeInDown' : ''
        }`}
      >
        Why RuhunaSports?
      </h2>
      <div
        ref={containerRef}
        className={`flex-row sm:flex  p-2 sm:p-5  ${
          containerInView ? 'animate__animated animate__fadeInUp' : ''
        }`}
      >
        <div style={{ flex: '1' }}>
          {' '}
          <LottiePage />
        </div>
        <div className="pl-5 sm:pl-20 md:pl-32" style={{ flex: '2' }}>
          <ul
            ref={ulRef}
            className={`list-disc list-inside ml-4 mt-5${
              ulInView ? 'animate__animated animate__fadeInLeft' : ''
            }`}
          >
            <li
              ref={li1Ref}
              className={`text-gray-900 mb-2 mt-5 ${
                li1InView ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              Dedicated platform for Ruhuna University sports enthusiasts.
            </li>
            <li
              ref={li2Ref}
              className={`text-gray-900 mb-2 mt-5 ${
                li2InView ? 'animate__animated animate__fadeInLeft' : ''
              }`}
            >
              Connects athletes, coaches, and fans within the university.
            </li>
            <li
              ref={li3Ref}
              className={`text-gray-900 mb-2 mt-5 ${
                li3InView ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              Provides news, updates, and event information for various sports.
            </li>

            <li
              ref={li5Ref}
              className={`text-gray-900 mb-2 mt-5 ${
                li5InView ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              Promotes healthy competition and sportsmanship.
            </li>
            <li
              ref={li6Ref}
              className={`text-gray-900 mb-2 mt-5 ${
                li6InView ? 'animate__animated animate__fadeInLeft' : ''
              }`}
            >
              Empowers athletes to showcase their talents and achievements.
            </li>
            <li
              ref={li7Ref}
              className={`text-gray-900 mb-2 mt-5 ${
                li7InView ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              Contributes to the overall development of sports at Ruhuna
              University.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyRuhunaSport;
