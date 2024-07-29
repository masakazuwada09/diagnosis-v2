const ContentTitle = ({ title, children }) => {
	return (
		<>
			<div className="flex items-center gap-4">
				<h5 className="text-xl text-left font-bold  text-black mb-0">
					{title}
				</h5>
				{children}
			</div>
			
		</>
	);
};

export default ContentTitle;
