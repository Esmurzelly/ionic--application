import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

const Tab1: React.FC = () => {
    const [image, setImage] = useState<any | null>(null);

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true, // iOS only - allows editing of the photo after it was taken
            resultType: CameraResultType.Base64
        });

        const img = `data:image/jpeg;base64, ${image.base64String}`;
        setImage(img);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Image Example</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand='block' onClick={takePicture}>Take Picture</IonButton>
                <img src={image} alt="img" />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;