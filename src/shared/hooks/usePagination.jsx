import {useSearchParams} from "react-router-dom";

function usePagination() {
    const [searchParams, setSearchParams] = useSearchParams()

    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '15');
    const totalItems = parseInt(searchParams.get('totalItems') || '');

    const handleChangePage = (page) => {
        if (page < 1) return;
        searchParams.set('page', page);
        setSearchParams(searchParams);
    }
    const handleChangeSize = (size) => {
        if (page <= 1) return;
        searchParams.set('size', size);
        setSearchParams(searchParams);
    }

    return {page, size, handleChangePage, handleChangeSize, totalItems};
}

export default usePagination;