<?php
// sql/run_inserts.php
require_once '../config/database.php';

// Increase execution time for multiple queries
set_time_limit(300);

$db = new Database();
$conn = $db->getConnection();

$sqlFile = __DIR__ . '/insert_data_2026_01_05.sql';

if (!file_exists($sqlFile)) {
    die("Error: SQL file not found at $sqlFile");
}

$sql = file_get_contents($sqlFile);

echo "Executing SQL from " . basename($sqlFile) . "...\n";

if ($conn->multi_query($sql)) {
    $i = 0;
    do {
        $i++;
        // discard results relative to INSERTs
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
    echo "SQL commands executed successfully.\n";
} else {
    echo "Error executing SQL: " . $conn->error . "\n";
}

$conn->close();
?>
