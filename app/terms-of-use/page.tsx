import React from "react";

export const metadata = {
  title: "Terms of Use | Level Up AI Skills",
  description:
    "Our terms of use outline the rules and guidelines for using the Level Up AI Skills platform.",
};

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>

      <div className="prose lg:prose-xl max-w-none">
        <p className="text-lg mb-6">Last Updated: May 17, 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
        <p>
          Welcome to Level Up AI Skills. These terms and conditions outline the
          rules and regulations for the use of our website.
        </p>
        <p>
          By accessing this website, we assume you accept these terms and
          conditions in full. Do not continue to use Level Up AI Skills if you
          do not accept all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">License to Use</h2>
        <p>
          Unless otherwise stated, Level Up AI Skills and/or its licensors own
          the intellectual property rights for all material on the website. All
          intellectual property rights are reserved.
        </p>
        <p>
          You may view and/or print pages from the website for your own personal
          use subject to restrictions set in these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul className="list-disc pl-6 my-4">
          <li>Republish material from this website</li>
          <li>Sell, rent, or sub-license material from the website</li>
          <li>Reproduce, duplicate, or copy material from the website</li>
          <li>
            Redistribute content from Level Up AI Skills (unless content is
            specifically made for redistribution)
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">User Content</h2>
        <p>
          In these terms and conditions, "User Content" means material
          (including without limitation text, images, audio material, video
          material, and audio-visual material) that you submit to this website,
          for whatever purpose.
        </p>
        <p>
          You grant to Level Up AI Skills a worldwide, irrevocable,
          non-exclusive, royalty-free license to use, reproduce, adapt, publish,
          translate and distribute your User Content in any existing or future
          media. You also grant to Level Up AI Skills the right to sub-license
          these rights, and the right to bring an action for infringement of
          these rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Limitation of Liability
        </h2>
        <p>
          The materials on Level Up AI Skills's website are provided on an 'as
          is' basis. Level Up AI Skills makes no warranties, expressed or
          implied, and hereby disclaims and negates all other warranties
          including, without limitation, implied warranties or conditions of
          merchantability, fitness for a particular purpose, or non-infringement
          of intellectual property or other violation of rights.
        </p>
        <p>
          In no event shall Level Up AI Skills or its suppliers be liable for
          any damages (including, without limitation, damages for loss of data
          or profit, or due to business interruption) arising out of the use or
          inability to use the materials on Level Up AI Skills's website, even
          if Level Up AI Skills or a Level Up AI Skills authorized
          representative has been notified orally or in writing of the
          possibility of such damage.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of your country, and you irrevocably submit to the
          exclusive jurisdiction of the courts in that location.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
        <p>
          Level Up AI Skills reserves the right to modify these terms at any
          time. We do so by posting and drawing attention to the updated terms
          on the site. Your decision to continue to visit and make use of the
          site after such changes have been made constitutes your formal
          acceptance of the new Terms of Use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us
          at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> info@levelupaiskills.com
        </p>
      </div>
    </div>
  );
}
