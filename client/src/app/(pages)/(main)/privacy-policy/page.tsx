const Page = () => {
  return (
    <section className="min-h-screen AntonFont py-20  px-6  bg-gradient-to-br from-[#E6FFF5] to-[#4f3d80]">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Terms & Conditions */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 border border-white/20">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            UP&PRO — Terms & Conditions
          </h1>

          <ol className="space-y-4 text-base leading-relaxed list-decimal list-inside">
            <li>
              <strong>Introduction:</strong> Welcome to UP&PRO! These Terms and Conditions govern your use of our mobile application and services. By subscribing and using UP&PRO, you agree to be bound by these terms.
            </li>
            <li>
              <strong>Subscription & Access:</strong> Users must subscribe for a monthly fee of ৳300 to access UP&PRO&apos;s live classes, daily speaking partners, and learning content. Each subscription is valid for 30 days. Violations such as abusive language or spam may result in suspension.
            </li>
            <li>
              <strong>Use of Service:</strong> Keep your login credentials private. Misuse of chat/voice features or account sharing is prohibited.
            </li>
            <li>
              <strong>Refund Policy:</strong> No refunds once a subscription is activated. In exceptional cases (e.g., duplicate payments), contact support.
            </li>
            <li>
              <strong>Content Ownership:</strong> All content is owned by UP&PRO. Redistribution or recording without permission is not allowed.
            </li>
            <li>
              <strong>Termination:</strong> UP&PRO may suspend accounts that violate our terms without prior notice.
            </li>
            <li>
              <strong>Governing Law:</strong> These terms are governed under the laws of Bangladesh.
            </li>
          </ol>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            UP&PRO — Privacy Policy
          </h2>

          <ol className="space-y-4 text-base leading-relaxed list-decimal list-inside">
            <li>
              <strong>Information We Collect:</strong> We collect name, gender, district, class, email, phone number, device info, and session metadata (not audio).
            </li>
            <li>
              <strong>How We Use Your Data:</strong> For partner matching, notifications, app improvements, and occasional support or promotions.
            </li>
            <li>
              <strong>Data Sharing:</strong> We do not sell personal data. We may share anonymized data with partners or comply with lawful requests.
            </li>
            <li>
              <strong>Data Security:</strong> Your data is stored securely via Firebase and protected with encryption.
            </li>
            <li>
              <strong>User Rights:</strong> You can request to delete your account/data by contacting support.
            </li>
            <li>
              <strong>Children&apos;s Privacy:</strong> The app is for users 13+. Under-13s must use it with parental supervision.
            </li>
            <li>
              <strong>Policy Updates:</strong> Changes will be posted in the app and on our website.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Page;
