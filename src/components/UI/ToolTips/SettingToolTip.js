import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './Tooltip.css';
import { IoIosHelpCircleOutline } from "react-icons/io";

const SettingToolTip = ({ headerHext, bodyText }) => {
    return (
        <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={
                <Popover id={`popover-positioned-bottom`} className='colorB3'>
                    <Popover.Header className='color2' as="h3">{headerHext} </Popover.Header>
                    <Popover.Body >
                        <span >
                            {bodyText}
                        </span>
                    </Popover.Body>
                </Popover>
            }
        >
            <div className='notification-container_questionToolTipDiv'>
                <IoIosHelpCircleOutline className='tooltipImg' />
            </div>
        </OverlayTrigger>
    );
};

export default SettingToolTip;