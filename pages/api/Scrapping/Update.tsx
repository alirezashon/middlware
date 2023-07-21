/** @format */

// DATA SAMPLE 
// const data = [{assetCode:value, assetName:value, category:value , agentName:value}] 


import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const main = async () => {
	const browser = await puppeteer.launch({ headless: false }) // Open a visible browser window
	const page = await browser.newPage()
	await page.goto(`${process.env.ASSET_URL}`)


	await page.click('.fa-chevron-down', { delay: 777 })
	await page.type('#UserName', `${process.env.ASSET_USER}`)
	await page.type('#Password', `${process.env.ASSET_PASS}`)
	await page.click('button[class="btn btn-block btn-cta-primary"]')
	
	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	await page.waitForTimeout(1000)

	await page.waitForSelector('.AddPlus')
	await page.click('.AddPlus')

	await page.evaluate(() => {
		history.pushState(
			'',
			document.title,
			window.location.pathname + window.location.search
		)
	})
	await page.waitForSelector('.FormAssetCustomFilterViewCustomSearch')
	await page.type(
		'.FormAssetCustomFilterViewCustomSearch',
		'AST2023336033,AST2022204888,AST2022306419,AST2022306532,AST2022306533,AST2022306547,AST2023333530,AST2023341263,AST2023344271,AST2023340596'
	)
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.waitForSelector('.AssetTrackerFileColumn')

	await new Promise((resolve) => setTimeout(resolve, 8000))
	await page.waitForSelector('.select-checkbox')
	await page.click('.select-checkbox')

	await page.waitForTimeout(3000)

	await page.click('.btn-updateasset')
	await page.waitForTimeout(2000)

	const data = [
		{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
		{ AssetName: 'Mohammad', Category: 'The Warrior', Brand: 'Islamic' },
		{ AssetName: 'Chirst', Category: 'Healer', Brand: 'Christian' },
		{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
		{ AssetName: 'Mohammad', Category: 'The Warrior', Brand: 'Islamic' },
		{ AssetName: 'Chirst', Category: 'Healer', Brand: 'Christian' },
		{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
		{ AssetName: 'Mohammad', Category: 'The Warrior', Brand: 'Islamic' },
		{ AssetName: 'Chirst', Category: 'Healer', Brand: 'Christian' },
		{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
	]

	for (let i = 0; i < data.length; i++) {
		const rowSelector = `tbody tr:nth-child(${i + 1})`
		const assetCodeCellSelector = `${rowSelector} td:nth-child(3)`
		const categoryCellSelector = `${rowSelector} td:nth-child(5)`
		const brandCellSelector = `${rowSelector} td:nth-child(6)`

		await page.click(assetCodeCellSelector)
		await page.type(assetCodeCellSelector, data[i].AssetName)

		await page.click(categoryCellSelector)
		await page.type(categoryCellSelector, data[i].Category)

		await page.click(brandCellSelector)
		await page.type(brandCellSelector, data[i].Brand)
	}

	//  await browser.close()
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const spanTexts = await main()
		res.status(200).json({ message: 'Action performed successfully' })
	} catch (error) {
		console.error('Error performing action:', error)
		res.status(500).json({ error: 'Error performing action' })
	}
}

export default handler
