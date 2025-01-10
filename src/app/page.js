
import About from "@/components/About";
import Banner from "@/components/Banner";
import BlogSection from "@/components/BlogSection";
import FreshProducts from "@/components/FreshProducts";
import Offer from "@/components/Offer";
import Testimonial from "@/components/Testimonial";

export default async function Page() {
    
    return (
        <>
            <Banner></Banner>
            <div className="lg:w-[1080px] mx-auto">
                <FreshProducts></FreshProducts>
                <About></About>
                <Offer></Offer>
                <Testimonial></Testimonial>
                <BlogSection></BlogSection>
            </div>
        </>
    )
}