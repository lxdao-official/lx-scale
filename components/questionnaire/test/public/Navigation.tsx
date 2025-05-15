import { Button } from "@/components/ui/button";

interface NavigationProps {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    onSubmit: () => void;
    isLastPage: boolean;
}

export function Navigation({ currentPage, totalPages, goToPage, onSubmit, isLastPage }: NavigationProps) {
    return (
        <div className="flex justify-between items-center mt-8">
            <Button
                variant="outline"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                上一页
            </Button>

            <span className="text-sm text-gray-500">
                第 {currentPage} 页 / 共 {totalPages} 页
            </span>

            {isLastPage ? (
                <Button onClick={onSubmit}>
                    提交
                </Button>
            ) : (
                <Button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    下一页
                </Button>
            )}
        </div>
    );
} 