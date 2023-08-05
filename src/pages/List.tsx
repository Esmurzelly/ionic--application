import React, { useEffect, useRef, useState } from 'react';
import { addOutline, trashBinOutline } from 'ionicons/icons';
import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';

import './List.css';

interface SelectedUser {
    name: {
        first: string,
        last: string
    }
    picture?: any
    email: string
    nat: string
}

const List: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert] = useIonAlert();
    const [showToas] = useIonToast();
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const modal = useRef<HTMLIonModalElement>(null)
    const cardModal = useRef<HTMLIonModalElement>(null)
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const page = useRef(null);

    const [activeSegment, setActiveSegment] = useState<any>('details');

    useEffect(() => {
        setPresentingElement(page.current)
    }, [])

    const getUsers = async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const users = await data.json();
        return users.results;
    };

    useIonViewWillEnter(async () => { // kinda useEffect
        const users = await getUsers();
        console.log(users)
        setUsers(users);
        setLoading(false);
    });

    const clearList = () => {
        showAlert({
            header: 'Confirm',
            message: 'Delete all users?',
            buttons: [
                { text: "Cancel", role: 'cancel' },
                {
                    text: "Delete", handler: () => {
                        setUsers([]);
                        showToas({
                            message: "All users deleted",
                            duration: 2000,
                            color: "danger"
                        });
                    }
                },
            ]
        })
    };

    const doRefresh = async (e: any) => {
        const data = await getUsers();
        setUsers(data)
        e.detail.complete();
    }

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>List</IonTitle>

                    <IonButtons slot='end'>
                        <IonButton onClick={clearList}>
                            <IonIcon slot='icon-only' icon={trashBinOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonToolbar color={'success'}>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot='fixed' onIonRefresh={(event) => doRefresh(event)}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading && (
                    [...Array(10)].map((_, index) => (
                        <IonCard key={index}>
                            <IonCardContent className='ion-no-padding'>
                                <IonItem lines='none'>
                                    <IonAvatar slot='start'>
                                        <IonSkeletonText />
                                    </IonAvatar>

                                    <IonLabel>
                                        <IonSkeletonText animated style={{ width: '150px' }} />
                                        <p><IonSkeletonText /></p>
                                    </IonLabel>
                                    <IonChip slot='end' color={'primary'}></IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}

                {users.map((user, index) => (
                    <IonCard key={index} onClick={() => setSelectedUser(user)}>
                        <IonCardContent className='ion-no-padding'>
                            <IonItem lines='none'>
                                <IonAvatar slot='start'>
                                    <IonImg src={user.picture.large} />
                                </IonAvatar>

                                <IonLabel>
                                    {user.name.first} {user.name.last}
                                    <p>{user.email}</p>
                                </IonLabel>
                                <IonChip slot='end' color={'primary'}>
                                    {user.nat}
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal
                    ref={modal}
                    isOpen={selectedUser !== null}
                    onIonModalDidDismiss={() => setSelectedUser(null)}
                    breakpoints={[0, 0.5, 0.8]}
                    initialBreakpoint={0.3}
                >
                    <IonHeader>
                        <IonToolbar color={'light'}>
                            <IonButtons slot='start'>
                                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>
                                {selectedUser?.name?.first} {selectedUser?.name?.last}
                            </IonTitle>
                        </IonToolbar>

                        <IonToolbar color={'light'}>
                            <IonSegment value={activeSegment} onIonChange={(e) => setActiveSegment(e.detail.value!)}>
                                <IonSegmentButton value='details'>Deatails</IonSegmentButton>
                                <IonSegmentButton value='calendar'>Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className='ion-padding'>
                        {activeSegment === 'details' && (
                            <IonCard>
                            <IonCardContent className='ion-no-padding'>
                                <IonItem lines='none'>
                                    <IonAvatar slot='start'>
                                        <IonImg src={selectedUser?.picture.large} />
                                    </IonAvatar>
    
                                    <IonLabel>
                                        {selectedUser?.name.first} {selectedUser?.name.last}
                                        <p>{selectedUser?.email}</p>
                                    </IonLabel>
                                    <IonChip slot='end' color={'primary'}>
                                        {selectedUser?.nat}
                                    </IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                        )}
                        {activeSegment === 'calendar' && <IonDatetime />}
                    </IonContent>
                </IonModal>
            </IonContent>

            <IonModal ref={cardModal} trigger='card-modal' presentingElement={presentingElement!}>
                <IonHeader>
                    <IonToolbar color={'success'}>
                        <IonButtons slot='start'>
                            <IonButton onClick={() => cardModal.current?.dismiss()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>
                            Card modal
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <p>My card modal</p>
                </IonContent>
            </IonModal>

            <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                <IonFabButton id='card-modal'>
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default List;