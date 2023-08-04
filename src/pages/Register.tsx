import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegister = (e: any) => {
        e.preventDefault();
        console.log("do register")
        router.goBack();
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollY={false} color='dark'>
                <IonGrid fixed>
                    <IonRow class='ion-justify-content-center'>
                        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                            <IonCard color={'dark'}>
                                <IonCardContent>
                                    <form onSubmit={doRegister}>
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
                                            color={'secondary'}
                                            routerLink='/register'
                                        >
                                            Create my account
                                            <IonIcon icon={checkmarkDoneOutline} slot='end' />
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>


            </IonContent>

        </IonPage>
    );
};

export default Register;