/** @format */

import React from 'react'

interface TableProps {
	existData: { [key: string]: string }[]
	contradictionName: { [key: string]: string }[]
	contradictionCategory: { [key: string]: string }[]
}

const Table: React.FC<TableProps> = ({
	existData,
	contradictionName,
	contradictionCategory,
}) => {
	return (
		<table className='contradiction-table'>
			<thead>
				<tr>
					{existData.length > 0 &&
						Object.keys(existData[0]).map((key) => <th key={key}>{key}</th>)}
				</tr>
			</thead>
			<tbody>
				{contradictionName.map((row, index) => (
					<tr key={index}>
						{Object.entries(row).map(([key, value], index) => (
							<td
								key={index}
								style={
									key === 'assetName'
										? { backgroundColor: '#fae337' }
										: undefined
								}>
								{value}
							</td>
						))}
					</tr>
				))}
				{contradictionCategory.map((row, index) => (
					<tr key={index}>
						{Object.entries(row).map(([key, value], index) => (
							<td
								key={index}
								style={
									key === 'category'
										? { backgroundColor: '#fa7d5a' }
										: undefined
								}>
								{value}
							</td>
						))}
					</tr>
				))}
				{existData.map((row, index) => (
					<tr key={index}>
						{Object.entries(row).map(([key, value], index) => (
							<td key={index}>{value}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Table
