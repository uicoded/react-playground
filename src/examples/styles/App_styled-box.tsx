export function Box({
	size,
	...otherProps
}: {
	size?: 'small' | 'medium' | 'large'
} & React.ComponentProps<'div'>) {
	const sizeClassName = size ? `box--${size}` : ''
	return (
		<div
			{...otherProps}
			className={['box', otherProps.className, sizeClassName]
				.filter(Boolean)
				.join(' ')}
			style={{ fontStyle: 'italic', ...otherProps.style }}
		/>
	)
}

export default function App() {
	return (
		<div>
			<Box size="small" style={{ backgroundColor: 'lightblue' }}>
				small lightblue box
			</Box>
			<Box size="medium" style={{ backgroundColor: 'pink' }}>
				medium pink box
			</Box>
			<Box size="large" style={{ backgroundColor: 'orange' }}>
				large orange box
			</Box>
			<Box id="box-4">sizeless colorless box</Box>
		</div>
	)
}