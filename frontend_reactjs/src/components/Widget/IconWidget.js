import React from 'react';
import PropTypes from './../../utils/propTypes';

import classNames from 'classnames';

import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const IconWidget = ({
  bgColor,
  icon: Icon,
  iconProps,
  title,
  subtitle,
  className,
  ...restProps
}) => {
  const classes = classNames('cr-widget', className, {
    [`bg-${bgColor}`]: bgColor,
  });
  return (
    <Card inverse className={classes} {...restProps} style={{ padding: '.5rem' }}>
      <CardBody className="cr-widget__icon" style={{ padding: '1px 10px' }}>
        <Icon size={50} {...iconProps} />
      </CardBody>
      <CardBody style={{ padding: '1px' }}>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle style={{ "fontSize": '12px' }}>{subtitle}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

IconWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

IconWidget.defaultProps = {
  bgColor: 'primary',
  icon: 'span',
  iconProps: { size: 50 },
};

export default IconWidget;
