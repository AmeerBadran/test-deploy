/* eslint-disable react/prop-types */
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ count = 10, onPageChange, theme = 'light' }) {
  const handlePageChange = (event, value) => {
    if (onPageChange) {
      onPageChange(value);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="mt-9 flex justify-center">
      <Stack spacing={2}>
        <Pagination
          count={count}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          size="large"
          sx={{
            '.MuiPaginationItem-root': {
              color: isDark ? '#FFFFFF' : '#555555',
            },
            '.MuiPaginationItem-outlined': {
              borderColor: isDark ? '#AAAAAA' : '#CCCCCC',
              backgroundColor: isDark ? '#1591b7' : '',
              '&:hover': {
                backgroundColor: isDark ? '#1bb5e4' : '#2490c2',
                color: '#FFFFFF',
              },
            },
            '.MuiPaginationItem-page.Mui-selected': {
              backgroundColor: isDark ? '#FFFFFF' : '#1c7097',
              color: isDark ? '#000000' : '#FFFFFF',
              borderColor: isDark ? '#FFFFFF' : '#06327a',
              '&:hover': {
                backgroundColor: isDark ? '#e6e6e6' : '#2490c2',
              },
            },
          }}
        />
      </Stack>
    </div>
  );
}
