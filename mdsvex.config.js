const config = {
    extensions: ['.svx', '.md'],
    smartypants: {
        dashes: 'oldschool',
    },
    frontmatter: {
		marker: "+",
        parse(frontmatter, messages) {
            try {
                return toml.parse(frontmatter);
            } catch (e) {
                messages.push(
                    "Parsing error on line " + e.line + ", column " + e.column + ": " + e.message
                );
            }
        }    
	}
};

export default config;