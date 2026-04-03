import { useState, useEffect } from 'react';
import { Bell, CheckCircle, Info, Trophy, Clock, ArrowLeft, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { notificationService } from '../services/api';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setIsLoading(true);
                const data = await notificationService.getNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const markAllAsRead = async () => {
        try {
            const unread = notifications.filter(n => !n.read);
            await Promise.all(unread.map(n => notificationService.markAsRead(n.id)));
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error("Error marking all as read:", error);
        }
    };

    const deleteNotification = (id) => {
        // We don't have a delete endpoint yet, but user asked not to remove functionality.
        // I will keep it as a local UI action for now as in the original code.
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const toggleRead = async (id) => {
        try {
            const notification = notifications.find(n => n.id === id);
            if (!notification.read) {
                await notificationService.markAsRead(id);
                setNotifications(prev => prev.map(n =>
                    n.id === id ? { ...n, read: true } : n
                ));
            } else {
                // If marking as unread, we'd need a backend endpoint, but for now just local UI
                setNotifications(prev => prev.map(n =>
                    n.id === id ? { ...n, read: false } : n
                ));
            }
        } catch (error) {
            console.error("Error toggling read status:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy transition-colors">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-slate-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Fetching Notifications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/dashboard"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-navy-light rounded-xl transition-colors text-slate-500 dark:text-slate-400"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-black text-navy dark:text-white tracking-tight">Notifications</h1>
                </div>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={markAllAsRead}
                        className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-2 group transition-colors"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <NotificationCard
                            key={notif.id}
                            notification={notif}
                            onDelete={() => deleteNotification(notif.id)}
                            onToggleRead={() => toggleRead(notif.id)}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-navy-light rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                        <div className="bg-slate-50 dark:bg-navy p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-bold">No notifications yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const NotificationCard = ({ notification, onDelete, onToggleRead }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
            case 'achievement':
                return <Trophy className="w-5 h-5 text-amber-500" />;
            default:
                return <Bell className="w-5 h-5 text-primary" />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 dark:bg-green-500/10';
            case 'info':
                return 'bg-blue-50 dark:bg-blue-500/10';
            case 'achievement':
                return 'bg-amber-50 dark:bg-amber-500/10';
            default:
                return 'bg-indigo-50 dark:bg-indigo-500/10';
        }
    };

    return (
        <div className={`group relative bg-white dark:bg-navy-light p-4 sm:p-6 rounded-2xl border transition-all hover:shadow-md ${notification.read ? 'border-slate-100 dark:border-slate-800 opacity-75' : 'border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/30'}`}>
            {!notification.read && (
                <div className="absolute top-6 left-2 w-1.5 h-1.5 bg-primary rounded-full"></div>
            )}

            <div className="flex gap-4 sm:gap-5">
                <div className={`${getBgColor(notification.type)} p-3 rounded-xl h-fit shrink-0`}>
                    {getIcon(notification.type)}
                </div>

                <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-1 gap-1">
                        <h3 className={`font-bold text-base sm:text-lg tracking-tight truncate w-full ${notification.read ? 'text-slate-500 dark:text-slate-400' : 'text-navy dark:text-white'}`}>
                            {notification.title}
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                        </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${notification.read ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'}`}>
                        {notification.message}
                    </p>

                    <div className="mt-4 flex items-center gap-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={onToggleRead}
                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                        >
                            {notification.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button
                            onClick={onDelete}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-error flex items-center gap-1 transition-colors"
                        >
                            <Trash2 className="w-3 h-3" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;

