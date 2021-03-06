import { createGlobalStyle } from 'styled-components'

const ReactPopupStyle = createGlobalStyle`
  .mm-popup {
    display: none;
}

.mm-popup--visible {
    display: block;
}

.mm-popup__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: auto;
    background: rgba(10, 10, 10, 0.45);
}

.mm-popup__close {
    display: none;
}

.mm-popup__input {
    display: block;
    width: 100%;
    height: 30px;
    border-radius: 3px;
    background: #f5f5f5;
    border: 1px solid #e9ebec;
    outline: none;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    font-size: 14px;
    padding: 0 12px;
    color: #808080;
}

.mm-popup__btn {
    border-radius: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0.85em 1em;
    margin: 0 0 1rem 0;
    line-height: 1;
    border: 1px solid #666;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    font-size: 0.9rem;
    font-weight: 400;
    color: #333;
    background: transparent;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    font-family: inherit;
}

.mm-popup__btn--success {
    transition: background-color 0.25s ease-out, color 0.25s ease-out;
    background-color: #3497c5;
    border-color: #3497c5;
    color: #fff;
}

.mm-popup__btn--success.primary:hover,
.mm-popup__btn--success.primary:focus,
.mm-popup__btn--success.hover,
.mm-popup__btn--success:hover,
.mm-popup__btn--success:focus,
.mm-popup__btn--success:active {
  background: #2f5767;
}

.mm-popup__btn--danger {
    background-color: #c5545c;
    border-color: #c5545c;
    color: #fff;
}

.mm-popup__box {
    width: 250px;
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: -175px;
    background: #fff;
    box-shadow: 0px 5px 20px 0px rgba(126, 137, 140, 0.20);
    border: 1px solid #B8C8CC;
    overflow: hidden;
    z-index: 1001;
}

.mm-popup__box__header {
    padding: 15px 20px;
    color: #454B4D;
}

.mm-popup__box__header__title {
    margin: 0;
    font-size: 1.9375rem;
    text-align: left;
    font-weight: 400;
    font-style: normal;
    color:  #444444;
}

.mm-popup__box__body {
    padding: 20px;
    line-height: 1.4;
    color: #454B4D;
    background: #fff;
    position: relative;
    z-index: 2;
}

.mm-popup__box__body p {
    margin: 0 0 5px;
}

.mm-popup__box__footer {
    overflow: hidden;
    padding: 0px 20px 20px;
}

.mm-popup__box__footer__right-space {
    float: right;
}

.mm-popup__box__footer__right-space .mm-popup__btn {
    margin-left: 5px;
}

.mm-popup__box__footer__left-space {
    float: left;
}

.mm-popup__box__footer__left-space .mm-popup__btn {
    margin-right: 5px;
}

.mm-popup__box--popover {
    width: 300px;
    margin-left: -150px;
}

.mm-popup__box--popover .mm-popup__close {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0;
    cursor: pointer;
    outline: none;
    text-align: center;
    margin: 0;
    z-index: 3;
}

.mm-popup__box--popover .mm-popup__box__body {
    padding: 20px;
}

@media (max-width: 420px) {
    .mm-popup__box {
        width: auto;
        left: 10px;
        right: 10px;
        top: 10px;
        margin-left: 0;
    }
    .mm-popup__box__footer__left-space {
        float: none;
    }
    .mm-popup__box__footer__right-space {
        float: none;
    }
    .mm-popup__box__footer {
        padding-top: 30px;
    }
    .mm-popup__box__footer .mm-popup__btn {
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
}
`

export default ReactPopupStyle
