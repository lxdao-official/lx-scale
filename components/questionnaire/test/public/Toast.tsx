interface ToastProps {
    show: boolean;
    title: string;
    description: string;
    type: 'success' | 'error';
}

export function Toast({ show, title, description, type }: ToastProps) {
    if (!show) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className={`p-4 rounded-lg shadow-lg max-w-sm ${type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                } border-2`}>
                <h4 className={`font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'
                    } mb-1`}>
                    {title}
                </h4>
                <p className={
                    type === 'success' ? 'text-green-600' : 'text-red-600'
                }>
                    {description}
                </p>
            </div>
        </div>
    );
} 