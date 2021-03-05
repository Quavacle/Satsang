import React from 'react';

export default function LoanedOut({ books }) {
  const loanedBooks = books.filter((book) => {
    book.requested_by !== undefined && requested_by > 0;
  });

  if (books.requested_by === undefined) return <p>No Pending Loans</p>;
  return books.map((request, ind) => {
    return (
      <div key={ind}>
        {request.book.title} requested by
        {request.requested_by.map((user) => (
          <ul key={user._id}>
            <li>{user.username}</li>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <button
              data-user={user._id}
              data-id={request._id}
              onClick={(e) => handleAccept(e.target)}
            >
              Accept Loan
            </button>
          </ul>
        ))}
      </div>
    );
  });
}
