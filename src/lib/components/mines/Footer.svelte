<script>
    import { Footer, FooterBrand, FooterLinkGroup, FooterLink } from 'flowbite-svelte'
</script>

<Footer footerType="default" class="bg-gray-100 rounded-none shadow-none">
    <div class="mx-auto max-w-screen-xl text-center">
        <FooterBrand href="/" src="/favicon.svg" alt="Code Chronicles Logo" name="Code Chronicles" aClass="flex justify-center items-center"/>
        <p class="my-6 text-gray-500 dark:text-gray-400">Here, you can learn nearly anything related to Web development.</p>
        <FooterLinkGroup ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            <FooterLink liClass="" aClass="mr-4 link md:mr-6" href="/">Home</FooterLink>
            <FooterLink liClass="" aClass="mr-4 link md:mr-6" href="/#about">About</FooterLink>
            <FooterLink liClass="" aClass="mr-4 link md:mr-6" href="/pricing">Pricing</FooterLink>
        </FooterLinkGroup>
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023-{new Date().getFullYear()} <a href="/" class="link">Code Chronicles™</a>. All Rights Reserved.</span>
    </div>
</Footer>