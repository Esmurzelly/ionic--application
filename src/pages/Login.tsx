import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';

import logo from '../assets/logo.png'
import Intro from '../components/Into';


const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
    const router = useIonRouter();
    const [intoSeen, setIntroSeen] = useState(true);

    const doLogin = (e: any) => {
        e.preventDefault();
        console.log("do login")
        // router.push('/home', 'root');
    };

    const finishIntro = async () => {
        setIntroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: 'true' });
    };

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
            setIntroSeen(seen.value === 'true');
        };
        checkStorage();
    }, []);

    const seeIntroAgain = () => {
        setIntroSeen(false);
        Preferences.remove({key:INTRO_KEY});
    }

    return (
        <>
            {!intoSeen ? (
                <Intro onFinish={finishIntro} />
            ) : (
                <IonPage>
                    <IonHeader>
                        <IonToolbar color={'success'}>
                            <IonTitle>Free Code Camp</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent scrollY={false} color='dark'>
                        <div className='ion-text-center ion-padding'>
                            <img src={logo} alt="logo" width={'20%'} />
                        </div>
                        <IonCard color={'dark'}>
                            <IonCardContent>
                                <form onSubmit={doLogin}>
                                    <IonInput
                                        label='email'
                                        type='email'
                                        placeholder='youremail@gmail.com'
                                        labelPlacement='floating'
                                        fill='outline'
                                    />

                                    <IonInput
                                        label='password'
                                        type='password'
                                        placeholder='password'
                                        labelPlacement='floating'
                                        fill='outline'
                                        className='ion-margin-top'
                                    />

                                    <IonButton
                                        type='submit'
                                        expand='block'
                                        className='ion-margin-top'
                                    >
                                        Login
                                        <IonIcon icon={logInOutline} slot='end' />
                                    </IonButton>

                                    <IonButton
                                        type='button'
                                        expand='block'
                                        className='ion-margin-top'
                                        color={'secondary'}
                                        routerLink='/register'
                                    >
                                        Create account
                                        <IonIcon icon={personCircleOutline} slot='end' />
                                    </IonButton>

                                    <IonButton
                                        type='button'
                                        expand='block'
                                        className='ion-margin-top'
                                        color={'medium'}
                                        size='small'
                                        onClick={() => seeIntroAgain()}
                                        fill='clear'
                                    >
                                        Watch Intro
                                        <IonIcon icon={personCircleOutline} slot='end' />
                                    </IonButton>
                                </form>
                            </IonCardContent>
                        </IonCard>
                    </IonContent>
                </IonPage>
            )}
        </>
    );
};

export default Login;