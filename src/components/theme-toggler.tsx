import { animated, useSpring } from '@react-spring/web';
import { isEqual, merge } from 'lodash-es';
import * as React from 'react';

export const defaultProperties = {
  dark: {
    circle: {
      r: 9,
    },
    mask: {
      cx: '50%',
      cy: '15%',
    },
    svg: {
      transform: 'rotate(55deg)',
    },
    lines: {
      opacity: 0,
    },
  },
  light: {
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    svg: {
      transform: 'rotate(90deg)',
    },
    lines: {
      opacity: 1,
    },
  },
  springConfig: { mass: 4, tension: 250, friction: 35, duration: 250 },
};

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange'>;

export interface Props extends SVGProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  style?: React.CSSProperties;
  size?: number | string;
  animationProperties?: typeof defaultProperties;
  moonColor?: string;
  sunColor?: string;
}

export const ThemeToggler: React.FC<Props> = ({
  onChange,
  children,
  checked = false,
  size = 24,
  animationProperties = defaultProperties,
  moonColor = '#fe016c',
  sunColor = '#ffbd07',
  style,
  ...rest
}) => {
  const id = React.useId();

  const properties = React.useMemo(() => {
    if (!isEqual(animationProperties, defaultProperties)) {
      return merge(defaultProperties, animationProperties);
    }
    return animationProperties;
  }, [animationProperties]);

  const { circle, svg, lines, mask } = properties[checked ? 'dark' : 'light'];

  const svgContainerProps = useSpring({
    ...svg,
    config: animationProperties.springConfig,
  });
  const centerCircleProps = useSpring({
    ...circle,
    config: animationProperties.springConfig,
  });
  const maskedCircleProps = useSpring({
    ...mask,
    config: animationProperties.springConfig,
  });
  const linesProps = useSpring({
    ...lines,
    config: animationProperties.springConfig,
  });

  const toggle = () => onChange(!checked);

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={checked ? moonColor : sunColor}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      onClick={toggle}
      style={{
        cursor: 'pointer',
        ...svgContainerProps,
        ...style,
      }}
      {...rest}
    >
      <mask id={id}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle style={maskedCircleProps as SVGProps} r="9" fill="black" />
      </mask>

      <animated.circle
        cx="12"
        cy="12"
        fill={checked ? moonColor : sunColor}
        style={centerCircleProps as SVGProps}
        mask={`url(#${id})`}
      />
      <animated.g stroke="currentColor" style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </animated.g>
    </animated.svg>
  );
};
