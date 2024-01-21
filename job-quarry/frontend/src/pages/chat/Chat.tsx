import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdSend } from 'react-icons/io';

import styles from './chat.module.css';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_CHATS, GET_COMPANY_PROFILE, GET_USER_PROFILE } from '../../graphql/queries';
import { MESSAGE_SUBSCRIPTION } from '../../graphql/subscriptions';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { SEND_MESSAGE } from '../../graphql/mutations';

interface MessageRealtime extends ChatMessage {
    senderId: string
}

const Chat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const currentConversation = new URLSearchParams(location.search).get('id');
    const { isCompany, isLoading: isAuthLoading } = useSelector((state: RootState) => state.auth);
    const [chatQuery] = useLazyQuery(GET_CHATS);
    const [messageMutation] = useMutation(SEND_MESSAGE, { refetchQueries: [{ query: GET_CHATS }] });
    const [userQuery] = useLazyQuery(GET_USER_PROFILE);
    const [companyQuery] = useLazyQuery(GET_COMPANY_PROFILE);
    const [conversations, setConversations] = useState<MessageUserOverview[]>([]);
    const [currentConversationState, setCurrentConversationState] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useSubscription(MESSAGE_SUBSCRIPTION, {
        onData: (data) => {
            const newMessage = data.data.data.messageCreated as MessageRealtime;
            if (newMessage.senderId === currentConversationState) {
                setMessages(prev => {
                    const newValue = [...prev];
                    const message: ChatMessage = {
                        _id: newMessage._id,
                        isMine: newMessage.isMine,
                        content: newMessage.content
                    }
                    newValue.push(message);
                    return newValue;
                });
            }
        }
    });

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [currentConversationState]);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await chatQuery({ variables: { currentConversation } });
            if (error) {
                console.log(error);
                const graphQLError = error.graphQLErrors[0];
                if (graphQLError.extensions.code === 'NOT_FOUND') {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
                return;
            }
            const conversations = [...data.getChats.conversations] as MessageUserOverview[];
            const messages = [...data.getChats.messages] as ChatMessage[];
            if (currentConversation) {
                setCurrentConversationState(currentConversation);
                if (messages.length === 0) {
                    if (isCompany) {
                        const { data, error } = await userQuery({ variables: { getUserId: currentConversation } });
                        if (error) {
                            const graphQLError = error.graphQLErrors[0];
                            if (graphQLError.extensions.code === 'NOT_FOUND') {
                                navigate('/404');
                            }
                            else {
                                setError('Coś poszło nie tak, spróbuj ponownie później...');
                            }
                            return;
                        }
                        const desiredRecipient = data.getUser as UserProfile;
                        conversations.unshift({
                            _id: desiredRecipient._id,
                            image: desiredRecipient.profilePicture,
                            isCompany: false,
                            name: `${desiredRecipient.name} ${desiredRecipient.surname}`
                        });
                    }
                    else {
                        const { data, error } = await companyQuery({ variables: { getCompanyId: currentConversation } });
                        if (error) {
                            const graphQLError = error.graphQLErrors[0];
                            if (graphQLError.extensions.code === 'NOT_FOUND') {
                                navigate('/404');
                            }
                            else {
                                setError('Coś poszło nie tak, spróbuj ponownie później...');
                            }
                            return;
                        }
                        const desiredRecipient = data.getCompany as CompanyProfile;
                        conversations.unshift({
                            _id: desiredRecipient._id,
                            image: desiredRecipient.logo,
                            isCompany: true,
                            name: desiredRecipient.companyName
                        });
                    }
                }
            }
            else {
                if (conversations.length > 0) setCurrentConversationState(conversations[0]._id);
            }
            setConversations(conversations);
            setMessages(messages);
            setIsLoading(false);
        }

        fetchData();
    }, [currentConversation]);

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input') as HTMLInputElement;
        try {
            const { data } = await messageMutation({
                variables: {
                    messageInput: {
                        recipient: currentConversationState,
                        content: input.value
                    }
                }
            });
            form.reset();
            setMessages(prev => {
                const newValue = [...prev];
                newValue.push(data.sendMessage);
                return newValue;
            });
        } catch (err: any) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (isLoading || isAuthLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <nav className={styles.main__nav}>
                {
                    conversations.length > 0 ?
                        conversations.map(conversation => {
                            return (
                                <div key={conversation._id} className={styles.main__navLink}>
                                    <img className={styles.navLink__img} src={conversation.image ? conversation.image : '/default.webp'} alt={`${conversation.isCompany ? 'logo' : 'zdjęcie profilowe użytkownika'} ${conversation.name}`} />
                                    <div className={styles.navLink__column}>
                                        <Link className={styles.navLink__text} to={`/czaty?id=${conversation._id}`}>{conversation.name}</Link>
                                        <Link className={styles.navLink__link} to={`/${conversation.isCompany ? 'firma' : 'profil'}/${conversation._id}`}>Zobacz profil</Link>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <p className={styles.main__noResults}>Brak konwersacji</p>
                }
            </nav>
            {
                conversations.length > 0 &&
                <main className={styles.main__chat}>
                    <div ref={messageContainerRef} className={styles.chat__messages}>
                        {
                            messages.map(message => {
                                return (
                                    <p key={message._id} className={`${styles.chat__message} ${message.isMine ? styles.chat__message_mine : styles.chat__message_notMine}`}>{message.content}</p>
                                )
                            })
                        }
                    </div>
                    <form onSubmit={sendMessage} className={styles.chat__form}>
                        <input required className={styles.form__input} placeholder='Napisz coś...' aria-label='Napisz wiadomość' type="text" maxLength={300} />
                        <button title='Wyślij wiadomość' className={styles.form__button}>
                            <IoMdSend />
                        </button>
                    </form>
                </main>
            }
        </main>
    )
}

export default Chat
