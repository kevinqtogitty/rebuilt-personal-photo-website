import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition, animated, useSpring } from 'react-spring';

import { FlexWrapper, LI, UL } from '../stylesheets/globalReUsedComponents';
import {
  AnimatedSubMenuLink,
  Tooltip,
  Navigation
} from '../stylesheets/styled_components/component_styles/navigationStyles';
import '../stylesheets/plain_stylesheets/router.css';
import HeaderAndShoppingCart from './HeaderAndShoppingCart';

const NavigationMenu: React.FC = () => {
  const [subMenuIsActive, setSubMenuIsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipState, setTooltipState] = useState(false);

  //--------------------------------Copy to Clipboard-------------------------------------\\
  const handleCopyToClipboard = (): void => {
    const email = import.meta.env.EMAIL;
    navigator.clipboard.writeText(email);
    setCopied(true);
  };

  //--------------------------------Submenu animations-------------------------------------\\

  const [bounce1, setBounce1] = useSpring(() => ({
    translateX: '0px',
    color: '#000'
  }));
  const [bounce2, setBounce2] = useSpring(() => ({
    translateX: '0px',
    color: '#000'
  }));
  const [bounce3, setBounce3] = useSpring(() => ({
    translateX: '0px',
    color: '#000'
  }));
  const [emailBounce, setEmailBounce] = useSpring(() => ({
    translateX: '0px'
  }));

  const handleSubMenuBounce = (bounceKey: string) => {
    switch (bounceKey) {
      case 'firstItem':
        setBounce1.start({
          translateX: bounce1.translateX.goal === '0px' ? '20px' : '0px'
        });
        setBounce1.start({
          color: bounce1.color.goal === '#000' ? '#fff' : '#000'
        });
        break;
      case 'secondItem':
        setBounce2.start({
          translateX: bounce2.translateX.goal === '0px' ? '20px' : '0px'
        });
        setBounce2.start({
          color: bounce2.color.goal === '#000' ? '#fff' : '#000'
        });
        break;
      case 'thirdItem':
        setBounce3.start({
          translateX: bounce3.translateX.goal === '0px' ? '20px' : '0px'
        });
        setBounce3.start({
          color: bounce3.color.goal === '#000' ? '#fff' : '#000'
        });
        break;
      case 'email':
        setEmailBounce.start({
          translateX: emailBounce.translateX.goal === '0px' ? '20px' : '0px'
        });
        setTooltipState((tooltipState) => !tooltipState);
        break;
    }
  };

  const subMenuTransitions = useTransition(subMenuIsActive, {
    from: { opacity: 0, transform: 'translateX(150%)' },
    enter: { opacity: 1, transform: 'translateX(110%)' },
    leave: { opacity: 0, transform: 'translateX(150%)' }
  });

  //--------------------------------Tooltip animations-------------------------------------\\
  const tooltipHover = useTransition(tooltipState, {
    from: { opacity: 0, transform: 'translateY(-100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(100%)' }
  });

  const subMenu: JSX.Element = (
    <UL className="projectsMenuDesktop">
      <Link
        to={'/growingUp'}
        className="subMenuLink"
        onClick={() => setSubMenuIsActive((state) => !state)}
      >
        <AnimatedSubMenuLink
          onMouseEnter={() => handleSubMenuBounce('firstItem')}
          onMouseOut={() => handleSubMenuBounce('firstItem')}
          style={bounce1}
        >
          Growing Up Assala
        </AnimatedSubMenuLink>
      </Link>
      <Link
        to={'/onTheRoad'}
        className="subMenuLink"
        onClick={() => setSubMenuIsActive((state) => !state)}
      >
        <AnimatedSubMenuLink
          onMouseEnter={() => handleSubMenuBounce('secondItem')}
          onMouseOut={() => handleSubMenuBounce('secondItem')}
          style={bounce2}
        >
          OTRATEOTW
        </AnimatedSubMenuLink>
      </Link>
      <Link
        to={'below'}
        className="subMenuLink"
        onClick={() => setSubMenuIsActive((state) => !state)}
      >
        <AnimatedSubMenuLink
          onMouseEnter={() => handleSubMenuBounce('thirdItem')}
          onMouseOut={() => handleSubMenuBounce('thirdItem')}
          style={bounce3}
        >
          Below
        </AnimatedSubMenuLink>
      </Link>
    </UL>
  );

  return (
    <>
      <FlexWrapper
        className="headerAndNavigation"
        flexDirection="column"
        align="flex-start"
        justify="flex-start"
        position="fixed"
      >
        <HeaderAndShoppingCart />
        <Navigation className="desktopAndTabletNavigation">
          <UL className="desktopMenu">
            <Link to={'/'} className="mainMenuItem">
              Home
            </Link>
            <Link to={'/street'} className="mainMenuItem">
              <LI>Street</LI>
            </Link>
            <Link to={'/landscapes'} className="mainMenuItem">
              <LI>Landscapes</LI>
            </Link>
            <LI
              className="projects, mainMenuItem"
              onClick={() => setSubMenuIsActive((state) => !state)}
            >
              Projects
            </LI>
            <br />
            <br />
            <br />
            <Link to={'/store'} className="mainMenuItem">
              Store
            </Link>
            <Link to={'/about'} className="mainMenuItem">
              About
            </Link>
            <Link to={'/contact'} className="mainMenuItem">
              Contact
            </Link>
            {subMenuTransitions(
              (styles, item) =>
                item && <animated.div style={styles}>{subMenu}</animated.div>
            )}
          </UL>
          {/* <Anchor href="https://www.instagram.com/kevinq.t/?hl=en">
            <img
              className="insta"
              src="../../../public/icons/insta_icon"
              alt="instagram"
            />
          </Anchor> */}

          <UL className="emailInfo">
            <LI
              className="email"
              onClick={handleCopyToClipboard}
              style={emailBounce}
              as={animated.li}
              onMouseEnter={() => handleSubMenuBounce('email')}
              onMouseLeave={() => handleSubMenuBounce('email')}
            >
              kevinq.to@gmail.com
            </LI>
            {tooltipHover(
              (styles, item) =>
                item && (
                  <Tooltip style={styles}>
                    {copied ? 'Copied to clipboard!' : 'Click to copy'}
                  </Tooltip>
                )
            )}
          </UL>
        </Navigation>
      </FlexWrapper>
    </>
  );
};

export default NavigationMenu;
