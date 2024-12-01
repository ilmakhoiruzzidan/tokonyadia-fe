import PropTypes from "prop-types";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline/index.js";

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
    dataCount: PropTypes.number.isRequired,
    paging: PropTypes.object.isRequired
}

function Pagination({paging, currentPage, dataCount, onPageChange}) {
    const renderPagination = () => {
        const {page: currentPage, totalPages} = paging;
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) {
                pages.push('...');
            }
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages.map((page, index) => {
            if (typeof page === 'string') {
                return <span key={index} className="px-4">{page}</span>
            } else {
                return (
                    <button
                        key={index}
                        disabled={currentPage === page}
                        className={`px-4 py-2 rounded ${currentPage === page && 'text-primary font-bold'}`}
                        onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                )
            }
        })
    }

    return (
        <div className="flex justify-between mt-4 pt-4 border-t">
            <p>Showing {paging.size * (currentPage - 1) + 1} to {paging.size * (currentPage - 1) + dataCount} of {paging.totalItems} result</p>
            <div className="join">
                <button
                    disabled={paging.page <= 1}
                    onClick={() => onPageChange(+currentPage - 1)}
                    className="text-primary px-2 rounded cursor-pointer disabled:cursor-default disabled:text-base-300">
                    <ChevronLeftIcon className="size-5"/>
                </button>
                {renderPagination()}
                <button
                    className="text-primary px-2 rounded cursor-pointer disabled:cursor-default disabled:text-base-300"
                    disabled={paging.totalPages <= paging.page}
                    onClick={() => onPageChange(+currentPage + 1)}>
                    <ChevronRightIcon className="size-5"/>
                </button>
            </div>
        </div>
    )
}

export default Pagination;