import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import MessageTile from '../../components/messageTile/MessageTile';
import styles from './messages.module.css';

const Messages = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [howMany, setHowMany] = useState<number>(5);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/contact?howManyParam=${howMany}`,
            cancelToken: source.token
        })
            .then(res => {
                const data = res.data;
                setMessages(data.messages);
                setIsMore(data.isMore);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, [howMany]);


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <div className={styles.main__messages}>
                {
                    messages.length > 0 ?
                        messages.map(message => {
                            return (
                                <MessageTile
                                    key={message.id}
                                    id={message.id}
                                    author={message.fullName}
                                    subject={message.subject}
                                    opened={message.opened}
                                />
                            )
                        })
                        :
                        <p className={styles.main__noResults}>Brak wiadomości</p>
                }
            </div>
            {
                isMore && <button onClick={() => setHowMany(prev => prev + 5)} className={styles.main__showMore}>Pokaż więcej</button>
            }
        </main>
    )
}

export default Messages
