export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Contact Management</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is a contacts page that should have the sidebar and header.
        </p>
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The sidebar should be fixed on the left and stay in place when you scroll.
          </p>
        </div>
      </div>
    </div>
  );
}
