type currencyParseType = {
	price: number,
	language: string,
	styleCurrency?: string,
	currency: string,
}

export const currencyParser = ({ price, language, styleCurrency = 'currency', currency }: currencyParseType) => {
	const instance = Intl.NumberFormat(language, {
		style: styleCurrency,
		currency,
	});
	
	return instance.format(price);
};