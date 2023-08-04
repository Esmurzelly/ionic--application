import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import './Intro.css';

import Intro1Svg from '../assets/1.svg'
import Intro2Svg from '../assets/2.svg'
import Intro3Svg from '../assets/3.svg'

interface ContainerProps {
    onFinish: () => void;
};

const SwiperButtonNext = ({children}: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}

const SwiperButtonPrev = ({children}: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slidePrev()}>{children}</IonButton>
}

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {

    return (
        <Swiper>
            <SwiperSlide>
                <img src={Intro1Svg} alt="intro1" />
                <IonText>
                    <h3>Build awesome app with Ionic UI components!</h3>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={Intro2Svg} alt="intro2" />
                <IonText>
                    <h3>Create powerful native app with Capacitor</h3>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={Intro3Svg} alt="intro3" />
                <IonText>
                    <h3>Enjoy learning the code!</h3>
                </IonText>
                <IonButton onClick={() => onFinish()}>Finish</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;