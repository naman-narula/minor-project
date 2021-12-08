import React from 'react';
import css from './priceApproval.module.scss';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import { Paper, TextField } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';

export default function PriceApproval(props) {
    return (
        <>
            <div className={css.priceForm}>
                <p>Our Best Price is {props.offeredprice}</p>
                <Paper elevation={24}>
                    <p>
                        <b> Are you Satisfied with Price ?</b>
                    </p>
                    <IconButton
                        size="medium"
                        onClick={(e) => props.handleClick(e, 'liked')}
                        color={props.approval.liked ? 'primary' : 'default'}
                    >
                        <ThumbUp />
                    </IconButton>
                    <IconButton
                        size="default"
                        onClick={(e) => props.handleClick(e, 'dislike')}
                        classes={{colorSecondary:{color:"#f50057"}}}
                        color={props.approval.dislike ? 'secondary' : 'default'}
                    >
                        <ThumbDown />
                    </IconButton>
                    <div>
                        {props.approval.dislike && (
                            <>
                                <p> Please Share Your Offer Price</p>
                                <TextField
                                    label="Your Offer Price"
                                    variant="standard"
                                    color="secondary"
                                    name="demandPrice"
                                    onChange={props.handleChange}
                                    type="number"
                                />
                            </>
                        )}
                    </div>
                </Paper>
            </div>
        </>
    );
}
