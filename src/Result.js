import React from "react";

// Loading animation is imported from  external library
import { DotWave } from '@uiball/loaders';

import { useSEOCheckerContext } from  './context/SEOCheckerContext';

import ScoreDisplay from './ScoreDisplay';
import DisplaySection from './DisplaySection';

function Result () {
    const { receivedData } = useSEOCheckerContext();

    /* This component renders conditionally. 
        If the data is currently under fecth, a loading animation is displayed. 
        Otherwise, the result is displayed. */
    if (receivedData) {

        /* The API response contains lots of data. However the object containing results we need is stored in a variable for easy acess.
            Note that explicitly statistics for just fist page of first task is accessed since no customised was demanded for the project.
            In case if stats of multiple pages or multiple tasks need to be accessed, appropriate mapping can be done here. */
        const site = receivedData.tasks[0].result[0].items[0]
        
        // Function to round decimal values to two places but return the integer values as such. Type of input can be both string or number.
        const rounDec = (input) => {
            if (JSON.stringify(input).includes('.')) {
                return Number(input).toFixed(2)
            }
            else return Number(input)
        }

        /* Headers tags are extracted from JSON received and are stored in foo object
            Further, the foo objct keys are sorted and stored in headerParameters object through sortObj function, for direct rendering */ 
        const head = site.meta.htags
        const foo = {}
        for (const headerSize in head) {
            foo[`Heading(s) with ${headerSize} tag`] = head[headerSize]
        }

        const sortObj = foo => Object.keys(foo).sort().reduce((bar, baz) => {bar[baz] = foo[baz]; return bar}, {})
        const headerParameters = sortObj(foo);


        /* This object is curatedly designed to store whether the SEO checks performed for each parameter on website suggest a positive impact or negative.
            Every key is the name of the parameter and contains both positive impact and negative impact of the value of that parameter on the website */
        const impact = {
            "Duplicate Title": {
                positive: "Your site avoids duplicate title tags, each page on your website can have a unique and descriptive title that accurately represents its content. This helps search engines understand the relevance of your pages to specific keywords, potentially leading to higher search engine rankings and improved SEO.",
                negative: "We found Duplicate title tags on your website which can have a negative impact on SEO. Search engines may find it challenging to determine which page to rank for a particular keyword. This can lead to lower search engine rankings, reduced visibility in search results, and a decrease in organic traffic."
            },
            "Duplicate Description": {
                positive: "By avoiding duplicate description tags, your website ensures that each page offers a unique and meaningful summary of its content. This clarity helps search engines understand your pages better, which can lead to improved rankings and better overall SEO. Users searching for relevant information are more likely to find and click on your pages in search results.",
                negative: "Your site may have duplicate description tags for some pages. This can confuse search engines, as they encounter identical summaries for different content. As a result, search engines might struggle to rank your pages accurately, potentially leading to lower visibility and reduced SEO performance."
            },
            "Duplicate Content": {
                positive: "By eliminating duplicate content, your website ensures that each page offers unique and valuable information. This clarity helps search engines understand your content's relevance and quality, potentially leading to higher rankings and improved SEO. Users searching for specific information are more likely to find and engage with your pages in search results.",
                negative: "Your website may contain duplicate content, which means the same or very similar information appears on multiple pages. Duplicate content can confuse search engines, as they have difficulty determining which page to prioritize in search results. This can lead to lower search engine rankings and reduced SEO performance."
            },
            "Size": {
                positive: "Your site maintains an optimal page size, ensuring that it loads quickly and efficiently. This contributes to a seamless user experience, reducing bounce rates and improving user satisfaction. Additionally, search engines favor faster-loading pages, potentially leading to higher rankings and improved SEO.",
                negative: "An excessively large page size can result in slow loading times, frustrating visitors and potentially causing higher bounce rates. Slow-loading pages may also receive lower search engine rankings, negatively impacting your SEO efforts. Ensuring an optimally sized page is essential for providing a smooth user experience and optimizing your site's SEO performance."
            },
            "Cache Control": {
                positive: "Your site leverages cache control headers to instruct browsers and other user agents on how to store and reuse your web content. This can significantly improve page load times for returning visitors, reducing server load and bandwidth usage. Improved site performance can lead to better user experiences, potentially resulting in higher search engine rankings and enhanced SEO.",
                negative: "In the absence of effective cache control, your website may load more slowly for visitors, especially for returning users. This can result in suboptimal user experiences and potentially lead to higher bounce rates. Additionally, search engines may take longer to crawl and index your pages, affecting your site's SEO performance. Implementing cache control can help mitigate these issues and enhance your website's overall SEO."
            },
            "Canonical": {
                positive: "Your site uses canonical tags to specify the preferred version of a web page when multiple versions of the same content exist. This helps search engines consolidate ranking signals and avoid indexing duplicate content, which can positively impact your SEO. Canonical tags ensure that search engines understand which page to display in search results, reducing the risk of diluted rankings and improving overall SEO performance.",
                negative: "In the absence of canonical tags, search engines may encounter multiple versions of the same content across your site. This can lead to indexing issues, diluted ranking signals, and potentially lower search engine rankings. Users may also encounter duplicate content in search results, which can impact their experience and your site's credibility. Implementing canonical tags is essential for optimizing your website's SEO by guiding search engines to the correct version of your pages."
            },
            "H1 Tags": {
                positive: "Your website utilizes H1 tags effectively, providing clear and relevant headings for each page. This is beneficial for both users and search engines. H1 tags help users understand the main topic of a page and improve the overall readability of your content. Additionally, search engines use H1 tags to better understand the content hierarchy on your site, which can positively impact SEO by improving the relevance and ranking of your pages in search results.",
                negative: "In the absence of H1 tags, your website may lack clear and structured headings, making it more challenging for users to navigate and understand your content. Search engines rely on H1 tags to identify the main topic of a page, so their absence can lead to lower visibility and rankings in search results. Implementing H1 tags is crucial for enhancing user experience and optimizing your SEO efforts."
            },
            "HTTP(S)": {
                positive: "By sticking with HTTPS, your website continues to provide a secure, trusted, and SEO-friendly environment for both users and search engines. Transitioning back to HTTP can result in negative consequences for security, SEO, and user trust.",
                negative: "Your website is moving from HTTPS to HTTP which can harm your SEO, compromise security, and reduce user trust. It is generally not recommended unless you have specific reasons for doing so, such as technical limitations or legacy systems that cannot support HTTPS"
            },
            "4xx Codes": {
                positive: "In the absence of 4xx status codes, your website ensures a better user experience by avoiding common client-related errors. This allows users and search engines to access and navigate your site without encountering obstacles or disruptions. It positively impacts SEO by contributing to better crawlability, indexability, and overall user satisfaction.",
                negative: "Your website returns 4xx status codes, it indicates that there are client-related errors. These errors can negatively affect user experience and SEO, as they may prevent users and search engines from accessing and navigating your site correctly."
            },
            "5xx Codes": {
                positive: "In the absence of 5xx status codes, your website ensures a smoother user experience by avoiding server-related errors. This contributes to faster loading times, improved reliability, and higher availability, all of which are essential for user satisfaction and SEO.",
                negative: "Your website returns 5xx status codes, it indicates that there are server-related errors or problems. These errors can negatively impact user experience and SEO, as they may lead to downtime, slow loading times, or other issues that discourage users and search engines."
            },
            "Broken": {
                positive: "From an SEO perspective, search engines can crawl and index your content more effectively when there are no broken links, which can positively impact your site's rankings and visibility. Maintaining a link structure free from broken links is essential for optimizing both user experience and SEO performance.",
                negative: "Your website contains broken links, it can be frustrating for users who are trying to navigate your site. Broken links lead to dead ends and error pages, creating a poor user experience. Additionally, search engines may encounter difficulty crawling and indexing your content due to these broken links"
            },
            "Content Rate": {
                positive: "Maintaining a healthy content ratio on your website ensures that users find valuable and informative content on every page they visit. Search engines can better understand and rank pages with sufficient content, leading to improved visibility and higher rankings in search results.",
                negative: "From an SEO perspective, search engines may struggle to understand and rank pages with minimal content, resulting in lower visibility of your site and potentially reduced rankings in search results. "
            },
            "Blocked Resources": {
                positive: "Fast-loading pages are favored by search engines and may receive higher rankings in search results. Optimizing render-blocking resources is a critical step in enhancing both user experience and SEO performance on your website.",
                negative: "Your website may have render-blocking resources that can impact user experience and SEO. These resources, such as JavaScript or CSS files, prevent a page from rendering quickly, potentially leading to slower page load times.  Slow-loading pages can be penalized by search engines, leading to lower rankings in search results."
            },
            "Readability": {
                positive: "Your website provides a more accessible and enjoyable experience for users. Such readability can lead to lower bounce rates, longer time spent on your pages, and potentially higher search engine rankings.",
                negative: "Your website's content may have a low readability rate, making it challenging for users to understand and engage with your content. Low readability can lead to higher bounce rates and lower user engagement, potentially affecting your search engine rankings"
            },
            "Title Length": {
                positive: "Search engines prefer appropriately sized titles like your website's, as they contribute to the relevance and readability of your pages.",
                negative: "Your website's title tags are excessively long and they can have a negative impact on user experience and SEO. Lengthy titles may get cut off in search engine results, leaving users with incomplete or unclear information about your pages"
            },
            "Image Alternate Text": {
                positive: "By including descriptive alt tags for your images, your website has become more inclusive and accessible to all users. Alt tags enable search engines to index your images effectively, potentially boosting your site's visibility in search results.",
                negative: "Your website lacks image alt tags which can negatively impact both user experience and SEO. Alt tags are valuable because search engines use them to understand and index images."
            },
            "FavIcon": {
                positive: "By adding a favicon to your website, you're enhancing its visual identity and improve user recognition. A favicon reinforces your brand and makes it easier for users to identify your site among others in their browser tabs.",
                negative: "Without a favicon, your site may appear less professional and memorable to users. However, absence of favicon affects SEO indirectly only, by influencing user behavior and engagement"
            },
            "Recursive Canonical": {
                positive: "By ensuring that canonical tags don't form loops, you're providing search engines with a consistent signal about the preferred version of your content. This leads to better SEO performance, as search engines can accurately rank and index your pages, improving visibility and user accessibility.",
                negative: "Your website uses recursive canonical tags that can potentially create a situation where canonical tags point to other canonical tags in a loop. This recursive behavior can confuse search engines, as they may struggle to determine the preferred version of a page."
            },
            "Orphan Page": {
                positive: " By ensuring that all pages on your website are linked to and from relevant pages, you're providing a clear navigation path for both users and search engines. This leads to better indexing, higher rankings, and improved overall SEO performance.",
                negative: "You have Orphan pages on your website which are those that lack internal links from other pages on your site. This can lead to poor SEO performance because search engines may have difficulty discovering and indexing these isolated pages."
            },
            "Web Server": {
                positive: " A reliable web server setup is critical for website performance, speed, and uptime. It also allows you to implement various optimizations and security measures to enhance the user experience and protect against potential threats.",
                negative: "Without a web server, your website is accessible to users on the internet. Users would be unable to request and view your web pages, and your online presence would effectively cease to exist."
            },
            "Title": {
                positive: "Your well-optimized title is tailored to the specific content of each page and incorporates relevant keywords. This enhances your website's visibility in search engine results and attract more organic traffic.",
                negative: "Without an effective title, your website pages lack clarity and fail to convey their content's purpose to users and search engines. This results in a suboptimal user experience and reduced SEO performance, as search engines may struggle to understand and rank your pages accurately."
            },
            "Description": {
                positive: "Your well-crafted description provides a concise and informative summary of your page's content. It serves as a brief preview that helps both users and search engines understand what to expect when they visit the page. This leads to higher click-through rates from search engine results and an improved user experience.",
                negative: "In the absence of a description, your page appears less informative in search engine results, potentially resulting in lower click-through rates. Additionally, search engines may have less context to understand the content of your page, which can impact your rankings."
            }
        }


        /* This object contains every result that would be rendered on the website.
            The keys of this object are sections of the page of website depending on the category of parameter.
            Each key contaiins an object having values type and parameters.
            The value of type identifies the design of the display while the parameters, as evident are the parameters to be displayed.
            The object can directly be mapped while rendering to generate content dynamically*/
        const data = {
            "OnPage Results": {
                "type": "plainDisplay",
                "parameters": {
                    "Inbound Links": `${rounDec(site.meta.inbound_links_count)}`,
                    "Internal Links": `${rounDec(site.meta.internal_links_count)}`,
                    "External Links": `${rounDec(site.meta.external_links_count)}`,
                    "Scripts": `${rounDec(site.meta.scripts_count)}`,
                    "Size of scripts": `${rounDec(site.meta.scripts_size)}kb`,
                    "Images": `${rounDec(site.meta.images_count)}`,
                    "Size of Images": `${rounDec(site.meta.images_size)}kb`,
                    "Plain Text Size": `${rounDec(site.meta.content.plain_text_size)}`,
                    "Plain Text Rate": `${rounDec(site.meta.content.plain_text_rate)}`,
                    "Plain Text Word Count": `${rounDec(site.meta.content.plain_text_word_count)}`,
                    "Automated Readability Index": `${rounDec(site.meta.content.automated_readability_index)}`,
                    "Coleman Liau Readability Index": `${rounDec(site.meta.content.coleman_liau_readability_index)}`,
                    "Dale Chall Readability Index": `${rounDec(site.meta.content.dale_chall_readability_index)}`,
                    "Flesch Kincaid Readability Index": `${rounDec(site.meta.content.flesch_kincaid_readability_index)}`,
                    "Smog Readability Index": `${rounDec(site.meta.content.smog_readability_index)}`,
                    "Title to Content Consistency": `${rounDec(site.meta.content.title_to_content_consistency)}`,
                    "Description to Content Consistency": `${rounDec(site.meta.content.description_to_content_consistency)}`,
                    "Render Blocking Scripts": `${rounDec(site.meta.render_blocking_scripts_count)}`,
                }
            },
            "SEO Details": {
                "type": "detailedBooleanDisplay",
                "parameters": {
                    "Duplicate Title": {
                        value: !site.duplicate_title,
                        positiveImpact: impact['Duplicate Title'].positive,
                        negativeImpact: impact['Duplicate Title'].negative
                    },
                    "Duplicate Description": {
                        value: !site.duplicate_description,
                        positiveImpact: impact['Duplicate Description'].positive,
                        negativeImpact: impact['Duplicate Description'].negative
                    },
                    "Duplicate Content": {
                        value: !site.duplicate_content,
                        positiveImpact: impact['Duplicate Content'].positive,
                        negativeImpact: impact['Duplicate Content'].negative
                    },
                    "Size": {
                        value: !site.checks.large_page_size,
                        positiveImpact: impact['Size'].positive,
                        negativeImpact: impact['Size'].negative
                    },
                    "Cache Control": {
                        value: site.cache_control.cachable,
                        positiveImpact: impact['Cache Control'].positive,
                        negativeImpact: impact['Cache Control'].negative
                    },
                    "Canonical": {
                        value: site.checks.cannonical,
                        positiveImpact: impact['Canonical'].positive,
                        negativeImpact: impact['Canonical'].negative
                    },
                    "H1 Tags": {
                        value: site.checks.no_h1_tag,
                        positiveImpact: impact['H1 Tags'].positive,
                        negativeImpact: impact['H1 Tags'].negative
                    },
                    "HTTP(S)": {
                        value: !site.checks.https_to_http_links,
                        positiveImpact: impact['HTTP(S)'].positive,
                        negativeImpact: impact['HTTP(S)'].negative
                    },
                    "4xx Codes": {
                        value: !site.checks.is_4xx_code,
                        positiveImpact: impact['4xx Codes'].positive,
                        negativeImpact: impact['4xx Codes'].negative
                    },
                    "5xx Codes": {
                        value: !site.checks.is_5xx_code,
                        positiveImpact: impact['5xx Codes'].positive,
                        negativeImpact: impact['5xx Codes'].negative
                    },
                    "Broken": {
                        value: !site.checks.is_broken,
                        positiveImpact: impact['Broken'].positive,
                        negativeImpact: impact['Broken'].negative
                    },
                    "Content Rate": {
                        value: !site.checks.low_content_rate,
                        positiveImpact: impact['Content Rate'].positive,
                        negativeImpact: impact['Content Rate'].negative
                    },
                    "Blocked Resources": {
                        value: !site.checks.has_render_blocking_resources,
                        positiveImpact: impact['Blocked Resources'].positive,
                        negativeImpact: impact['Blocked Resources'].negative
                    },
                    "Readability": {
                        value: !site.checks.low_readability_rate,
                        positiveImpact: impact['Readability'].positive,
                        negativeImpact: impact['Readability'].negative
                    },
                    "Title Length": {
                        value: !site.checks.title_too_long,
                        positiveImpact: impact['Title Length'].positive,
                        negativeImpact: impact['Title Length'].negative
                    },
                    "Image Alternative Text": {
                        value: !site.checks.no_image_alt,
                        positiveImpact: impact['Image Alternate Text'].positive,
                        negativeImpact: impact['Image Alternate Text'].negative
                    },
                    "FavIcon": {
                        value: !site.checks.no_favicon,
                        positiveImpact: impact['FavIcon'].positive,
                        negativeImpact: impact['FavIcon'].negative
                    },
                    "Recursive Canonical": {
                        value: !site.checks.recursive_canonical,
                        positiveImpact: impact['Recursive Canonical'].positive,
                        negativeImpact: impact['Recursive Canonical'].negative
                    },
                    "Orphan Page": {
                        value: !site.checks.is_orphan_page,
                        positiveImpact: impact['Orphan Page'].positive,
                        negativeImpact: impact['Orphan Page'].negative
                    },
                    "Web Server": {
                        value: site.server,
                        positiveImpact: impact['Web Server'].positive,
                        negativeImpact: impact['Web Server'].negative
                    },
                    "Title": {
                        value: !site.checks.no_title,
                        positiveImpact: impact['Title'].positive,
                        negativeImpact: impact['Title'].negative
                    },
                    "Description": {
                        value: !site.checks.no_description,
                        positiveImpact: impact['Description'].positive,
                        negativeImpact: impact['Description'].negative
                    }
                }
            },
            "Headers": {
                type: "nestedDisplay",
                "parameters": headerParameters
            },
            "Speed Insights": {
                "type": "plainDisplay",
                "parameters": {
                    "Time to Secure Connection": `${site.page_timing.connection_time}ms`,
                    "Downloading Time": `${site.page_timing.download_time}ms`,
                    "Waiting Time": `${site.page_timing.waiting_time}ms`,
                    "Interaction Time": `${site.page_timing.time_to_interactive}ms`,
                    "DOM Loading Time": `${site.page_timing.dom_complete}ms`,
                    "Largest Contentful Paint": `${site.page_timing.largest_contentful_paint}ms`
                }
            },
            "Social Media Meta (og) Tags": {
                "type": "detailedDisplay",
                "parameters": {
                    "Title": site.meta.social_media_tags['og:title'],
                    "Type": site.meta.social_media_tags['og:type'],
                    "Site Name": site.meta.social_media_tags['og:site_name'],
                    "URL": site.meta.social_media_tags['og:url'],
                    "Description": site.meta.social_media_tags['og:description'],
                    "Image URL": site.meta.social_media_tags['og:image'],
                    "Last Updated": site.meta.social_media_tags['og:updated_time']
                }
            }
        }

        // Stores value of On-Page Score to display on top.
        const onpage_score = site.onpage_score

        return (
            <div className="bg-white rounded-lg p-6 shadow">
                <ScoreDisplay score={onpage_score}/> 
                {/*
                * Score is displayed directly as it's design is different from every other display component 
                * Data is mapped and each section is dynamically displayed.
                */}
                {Object.keys(data).map((section, index) => (
                    <div key={index} className={"bg-gray-200 rounded-lg p-6 mt-8"}>
                        <h2 className="text-custom-sky-blue font-semibold text-3xl mt-4">{section}</h2>
                        <DisplaySection section={data[section]} />
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (
            <div className="bg-white rounded-lg p-6 shadow h-screen">
                <div className={`bg-custom-sky-blue rounded-lg p-6 flex flex-col justify-center items-center h-full`}>
                <h2 className="text-custom-white font-semibold text-xl pb-6 mb-2">Obtaining SEO statistics</h2> {/* Loading Page is displayed in case of form been submitted with valid URL but no Data received yet. */}
                    <DotWave size={60} color='#E1CBD7' />
                </div>
            </div>
        )
    }
} 

export default Result;