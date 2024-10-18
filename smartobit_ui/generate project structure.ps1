function Write-Tree {
    param (
        [string]$Path,
        [int]$Level = 0,
        [System.IO.StreamWriter]$Writer
    )

    $indent = ' ' * ($Level * 4)  # Increase the multiplier to increase indentation width
    $excludeDirs = @('node_modules')  # Add other directory names to exclude here
    $items = Get-ChildItem -Path $Path

    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            if ($excludeDirs -notcontains $item.Name) {
                $Writer.WriteLine("$indent+ [$($item.Name)](/$($item.FullName.Replace('\', '/')))")
                Write-Tree -Path $item.FullName -Level ($Level + 1) -Writer $Writer
            }
        } else {
            $Writer.WriteLine("$indent- $($item.Name)")
        }
    }
}

$Writer = [System.IO.StreamWriter]::new('project_structure.md')
Write-Tree -Path '.' -Writer $Writer
$Writer.Close()
