export async function load({ params, data }) {
    const { name } = params;
    var component = await import(`../../../lib/posts/${name}.md`);
    return { component: component.default, ...data }
};