export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Application Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is a settings page that should also have the sidebar and header.
        </p>
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Notice how the sidebar appears on this page too - it's shared across all pages in the
            (dashboard) group.
          </p>
        </div>
      </div>
    </div>
  );
}
