function areThereNewNotifications(notifications: UserNotification[]): boolean {
    const unseen = notifications.filter(item => item.seen === false);
    if (unseen.length > 0) return true;
    else return false;
}

export default areThereNewNotifications;