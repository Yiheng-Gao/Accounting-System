import React from 'react';
import './BalanceSheet.css'; 

function BalanceSheet({ companyName, accounts }) {
  const groupedAccounts = accounts.reduce((acc, account) => {
    if (account.AccountTypeName === 'Asset' || account.AccountTypeName === 'Liability'){
      acc[account.AccountTypeName] = acc[account.AccountTypeName] || [];
      acc[account.AccountTypeName].push(account);
    }
    return acc;
  }, {});

  const calculateTotal = (type) => {
    return groupedAccounts[type]?.reduce((sum, account) => sum + account.acctotalamount, 0) || 0;
  };

  const totalAssets = calculateTotal('Asset');
  const totalLiabilities = calculateTotal('Liability');
  const ownersEquity = totalAssets - totalLiabilities;

  return (
    <div className="balance-sheet-container">
      <h1>{companyName} Balance Sheet</h1>
      <div className="basis-and-date">
        <p>Basis: Accrual</p>
        <p>As of 2023/11/10</p>
      </div>
      <table>
        <thead>
          <tr>
          <th></th>
            <th>ACCOUNT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(groupedAccounts).map(([type, accounts]) => (
            <React.Fragment key={type}>
              <tr className="account-type-header">
                <td colSpan="3">{type}</td>
              </tr>
              {accounts.map(account => (
                <tr key={account.AccountName}>
                  <td></td>
                  <td>{account.AccountName}</td>
                  <td>${account.acctotalamount.toLocaleString()}</td>
                </tr>
              ))}
              {type === 'Asset' && (
                <tr>
                  <td>Total Asset</td>
                  <td></td>
                  <td>${totalAssets.toLocaleString()}</td>
                </tr>
              )}
              {type === 'Liability' && (
                <tr>
                  <td>Total Liability</td>
                  <td></td>
                  <td>${totalLiabilities.toLocaleString()}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
          <tr className="account-type-header">
            <td colSpan="3">Equity</td>
          </tr>
          <tr>
            <td>Owner's Equity</td>
            <td></td>
            <td>${ownersEquity.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="add-temp-note-btn">
        <button>+ Add Temporary Note</button>
      </div>
    </div>
  );
}

export default BalanceSheet;
