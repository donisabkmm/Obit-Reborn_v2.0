-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2024 at 09:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_obit`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ai_config`
--

CREATE TABLE `tbl_ai_config` (
  `id` int(2) NOT NULL,
  `enhancer_url` varchar(100) NOT NULL,
  `bgremover_url` varchar(100) NOT NULL,
  `created_by` int(5) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `status` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bureaus`
--

CREATE TABLE `tbl_bureaus` (
  `b_id` int(11) NOT NULL,
  `b_name` varchar(50) NOT NULL,
  `b_code` varchar(10) NOT NULL,
  `b_unit` int(10) NOT NULL,
  `b_status` tinyint(1) NOT NULL,
  `b_email` varchar(70) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int(5) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int(6) NOT NULL,
  `deleted_by` int(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_bureaus`
--

INSERT INTO `tbl_bureaus` (`b_id`, `b_name`, `b_code`, `b_unit`, `b_status`, `b_email`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_by`, `deleted_at`) VALUES
(1, 'Pampady', 'ppd', 1, 1, 'Null', NULL, 0, '2024-04-17 18:11:42.032036', 1, 1, '2024-04-17 18:01:30.480150'),
(2, 'bhbdsf', 'sdf', 1, 1, 'dsf@gmail.com', '2024-10-17 09:42:24.190906', 1, NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_email_settings`
--

CREATE TABLE `tbl_email_settings` (
  `id` int(2) NOT NULL,
  `smtp_host` varchar(50) NOT NULL,
  `smtp_port` varchar(10) NOT NULL,
  `smtp_username` varchar(25) NOT NULL,
  `smtp_password` varchar(50) NOT NULL,
  `default_email_id` varchar(25) NOT NULL,
  `status` tinyint(2) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_page_settings`
--

CREATE TABLE `tbl_page_settings` (
  `id` int(10) NOT NULL,
  `preset_name` varchar(25) NOT NULL,
  `page_width` varchar(10) NOT NULL,
  `page_height` varchar(10) NOT NULL,
  `column_width` varchar(10) NOT NULL,
  `gutter_space` varchar(10) NOT NULL,
  `paragraph_spacing` varchar(10) NOT NULL,
  `advertising_Column_width` varchar(10) NOT NULL,
  `advert_gutter_space` varchar(10) NOT NULL,
  `headline_font` varchar(70) NOT NULL,
  `headline_font_size` varchar(70) NOT NULL,
  `place_font` varchar(70) NOT NULL,
  `place_font_size` varchar(70) NOT NULL,
  `place_font_color` varchar(10) NOT NULL,
  `basic_story_font` varchar(70) NOT NULL,
  `basic_story_font_size` varchar(15) NOT NULL,
  `basic_story_color` varchar(10) NOT NULL,
  `photo_height` varchar(50) NOT NULL,
  `photo_width` varchar(50) NOT NULL,
  `photo_background_color` varchar(50) NOT NULL,
  `created_by` int(5) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_by` int(5) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_permission`
--

CREATE TABLE `tbl_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_permission`
--

INSERT INTO `tbl_permission` (`id`, `name`) VALUES
(1, 'Manage Users'),
(2, 'Manage Units'),
(3, 'Manage Bureaus'),
(4, 'Roles & Permission'),
(5, 'Roles & Permission'),
(6, 'Masthead Settings'),
(7, 'House Keeping'),
(8, 'App Settings'),
(9, 'New Stories'),
(10, 'Recent Stories'),
(11, 'All Stories'),
(12, 'Archived Stories'),
(13, 'Anniversary Stories'),
(14, 'Page Viewer'),
(15, 'Approve Stories'),
(16, 'Audit Logs'),
(17, 'Page Maker');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_photos`
--

CREATE TABLE `tbl_photos` (
  `id` int(5) NOT NULL,
  `story_id` varchar(50) DEFAULT NULL,
  `filename` varchar(254) DEFAULT NULL,
  `location` varchar(254) DEFAULT NULL,
  `status` tinyint(2) DEFAULT NULL,
  `bg_status` tinyint(2) DEFAULT NULL,
  `enhanced_status` tinyint(2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_photos`
--

INSERT INTO `tbl_photos` (`id`, `story_id`, `filename`, `location`, `status`, `bg_status`, `enhanced_status`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`) VALUES
(1, 'KTM-ID_12', 'KTM-ID_12.jpg', './Photos/KTM-ID_12.jpg', 9, NULL, NULL, '2024-05-17 13:58:23.716474', 1, NULL, NULL, NULL, NULL),
(2, 'KTM-ID_1', 'KTM-ID_1.jpg', './Photos/KTM-ID_1.jpg', 9, NULL, NULL, '2024-05-27 16:25:34.099018', 1, NULL, NULL, NULL, NULL),
(3, 'KTM-ID_2', 'KTM-ID_2.png', './Photos/KTM-ID_2.jpg', 9, NULL, NULL, '2024-10-07 11:29:08.853572', 1, NULL, NULL, NULL, NULL),
(4, 'KTM-ID_3', 'KTM-ID_3.jpg', './Photos/KTM-ID_3.jpg', 9, NULL, NULL, '2024-05-20 13:32:36.888864', 1, NULL, NULL, NULL, NULL),
(5, 'KTM-ID_4', 'KTM-ID_4.jpg', './Photos/KTM-ID_4.jpg', 9, NULL, NULL, '2024-05-20 13:37:19.831851', 1, NULL, NULL, NULL, NULL),
(6, 'KTM-ID_5', 'KTM-ID_5.jpg', './Photos/KTM-ID_5.jpg', 9, NULL, NULL, '2024-05-20 14:10:02.438419', 1, NULL, NULL, '2024-05-20 14:01:21.358615', 1),
(7, 'KTM-ID_6', 'KTM-ID_6.jpg', './Photos/KTM-ID_6.jpg', 9, NULL, NULL, '2024-05-20 14:11:32.791579', 1, NULL, NULL, NULL, NULL),
(8, 'KTM-ID_7', 'KTM-ID_7.jpg', './Photos/KTM-ID_7.jpg', 9, NULL, NULL, '2024-05-22 10:13:33.959824', 1, NULL, NULL, NULL, NULL),
(9, 'KTM-ID_8', 'KTM-ID_8.jpg', './Photos/KTM-ID_8.jpg', 9, NULL, NULL, '2024-05-22 10:15:04.233229', 1, NULL, NULL, NULL, NULL),
(10, 'KTM-ID_9', 'KTM-ID_9.jpg', './Photos/KTM-ID_9.jpg', 9, NULL, NULL, '2024-05-24 12:26:04.072828', 1, NULL, NULL, NULL, NULL),
(11, 'KTM-ID_10', 'KTM-ID_10.jpg', './Photos/KTM-ID_10.jpg', 9, NULL, NULL, '2024-05-24 15:50:21.558697', 1, NULL, NULL, '2024-05-24 14:25:46.348426', 1),
(12, 'KTM-ID_11', 'KTM-ID_11.jpg', './Photos/KTM-ID_11.jpg', 9, NULL, NULL, '2024-05-27 16:05:17.298043', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_roles`
--

CREATE TABLE `tbl_roles` (
  `id` int(11) NOT NULL,
  `g_name` varchar(50) DEFAULT NULL,
  `permissions` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int(2) DEFAULT NULL,
  `updated_by` int(6) DEFAULT NULL,
  `deleted_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `status` tinyint(2) DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_roles`
--

INSERT INTO `tbl_roles` (`id`, `g_name`, `permissions`, `created_at`, `created_by`, `updated_by`, `deleted_at`, `updated_at`, `status`, `deleted_by`) VALUES
(1, 'Admin', '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]', '2024-04-03 16:50:48.281797', 1, 1, '2024-04-11 11:19:10', '2024-08-16 18:51:29', 1, NULL),
(2, 'Coordinator', '[1, 2, 3, 4, 5]', '2024-05-17 12:41:45.285712', 1, NULL, '2024-05-17 12:41:45', '2024-05-17 12:41:45', 1, NULL),
(3, 'Page Maker', '[17]', '2024-08-16 18:51:16.892275', 1, NULL, '2024-08-16 18:51:16', '2024-08-16 18:51:16', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_server_config`
--

CREATE TABLE `tbl_server_config` (
  `id` int(2) NOT NULL,
  `ppiserver_url` varchar(100) NOT NULL,
  `spellcheck_url` varchar(100) NOT NULL,
  `created_by` int(5) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `status` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_status`
--

CREATE TABLE `tbl_status` (
  `s_id` int(2) NOT NULL,
  `s_name` varchar(50) NOT NULL,
  `s_description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_status`
--

INSERT INTO `tbl_status` (`s_id`, `s_name`, `s_description`) VALUES
(0, 'Disabled', 'disabled'),
(1, 'Active', 'actived'),
(2, 'deactivate', 'deactivated'),
(3, 'deleted', 'Deleted'),
(4, 'Creating', 'Creating'),
(5, 'pending', 'pending'),
(6, 'Created', 'Created'),
(7, 'Updated', 'Updated'),
(8, 'Processed', 'Image Processed'),
(9, 'Manual', 'Image Manual Processing');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stories`
--

CREATE TABLE `tbl_stories` (
  `id` int(5) NOT NULL,
  `story_id` varchar(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(6) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `place` varchar(200) DEFAULT NULL,
  `address` varchar(254) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `agent_id` varchar(100) DEFAULT NULL,
  `story` text NOT NULL,
  `story_assignment` longblob NOT NULL,
  `bureau` int(5) NOT NULL,
  `unit` int(5) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` int(5) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `updated_by` varchar(50) NOT NULL,
  `deleted_at` datetime(6) NOT NULL,
  `deleted_by` int(5) NOT NULL,
  `approveded_at` datetime(6) NOT NULL,
  `approveded_by` int(5) NOT NULL,
  `status` tinyint(2) NOT NULL,
  `photo_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stories`
--

INSERT INTO `tbl_stories` (`id`, `story_id`, `name`, `age`, `gender`, `place`, `address`, `contact_number`, `email_id`, `agent_id`, `story`, `story_assignment`, `bureau`, `unit`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `approveded_at`, `approveded_by`, `status`, `photo_id`) VALUES
(1, 'KTM-ID_1', 'തങ്കമ്മ', 70, 'female', 'മാമ്മൂട്', 'വട്ടമാക്കൽപറമ്പിൽ ', 'None', 'None', 'None', 'വട്ടമാക്കൽപറമ്പിൽ (കഞ്ഞിക്കണ്ടത്തിൽ) തങ്കമ്മ (70) അന്തരിച്ചു. സംസ്കാരം ഇന്ന് 11ന് പിആർഡിഎസ് മുതലപ്ര ശാഖ ശ്മശാനത്തിൽ. ഭർത്താവ്: പരേതനായ കുഞ്ഞുമോൻ. മക്കൾ: ബാബു, സുമ. മരുമക്കൾ: അംബിക, രാജേഷ്.', 0x8004952e000000000000005d947d94288c04756e6974948c034b544d948c0765646974696f6e944b028c08706f736974696f6e944b0e75612e, 1, 1, '2024-05-27 16:26:22.217824', 1, '0000-00-00 00:00:00.000000', '', '0000-00-00 00:00:00.000000', 0, '0000-00-00 00:00:00.000000', 0, 6, 2),
(2, 'KTM-ID_2', '', 0, '', NULL, '', '', NULL, NULL, '', '', 1, 1, '2024-05-27 16:26:24.096719', 1, '0000-00-00 00:00:00.000000', '', '0000-00-00 00:00:00.000000', 0, '0000-00-00 00:00:00.000000', 0, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stories_vector`
--

CREATE TABLE `tbl_stories_vector` (
  `id` int(5) NOT NULL,
  `story_id` varchar(15) NOT NULL,
  `story_vector` longblob NOT NULL,
  `datetime` datetime(6) DEFAULT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stories_vector`
--

INSERT INTO `tbl_stories_vector` (`id`, `story_id`, `story_vector`, `datetime`, `status`) VALUES
(1, 'KTM-ID_1', 0x8004958c0c0000000000008c156e756d70792e636f72652e6d756c74696172726179948c0c5f7265636f6e7374727563749493948c056e756d7079948c076e6461727261799493944b0085944301629487945294284b014d0003859468038c0564747970659493948c02663494898887945294284b038c013c944e4e4e4affffffff4affffffff4b007494628942000c000081719d3eeff23c3ffd96263f187bf0bead65033f8109ea3c87404e3fa5ce11be1ccd74becd92c7bc2bd177be281dbe3e249cb8bd300dcb3df8758dbda45a003f12156d3e8c8c0dbed203023fcd6c67be7ef00d3e58b685be9191fd3d862b583e9ced2dbe76623a3e866d0e3f6d75b8bebba9f9bd5554a03d9ba39d3efdd74bbe9150983bfcdf6f3dba549f3e93dd8abe7224cabcb7758cbe854f563e00f5813ce8e8493e2365d5be2adcc43e30abc3bee721e9bef1ae903d9f8da23d8c9b83be3bdd0dbf40a6fa3e2d5e6f3ddbcd953e1c3ad4bee36d73bea8b94abd452ad83c89c8e43ded87b9bebe708c3e0074753ed2a1873e7ebdf9beb7d7053e30c10b3f950f23be6963b63e24623a3e3285fcbee72461be3fc5743e07f37e3ebdf13d3deead02bf1421d63df8bebd3d17e0e7beacbac7be13ce703d3d32533cdc87c3bb9d91c9bd82c4d2bed4c2b93e1c37363fae356cbedcd91a3e21349f3d6fc3bbbe8a7966bfb44cef3e1f124fbd8991813daf3776be73abe63d44812fbdcd5dbbbeac4409be33a818bf3b5f1a3daee8933c3046bdbe7469533ebc48763e84d6a83ef0e6acbe96fdca3d0d1521be97f93d3e61f120bf2ea9723ea43ccfbc16f79b3ea8ae5d3e1d5ed9be8413f3bcc18324bfb24735bdb6dca7be260ab2be59722d3ef1038b3e22a20b3f8a72ec3ee7c9e03d1796ed3e2eeab2becfc9803d5f9722be2b279dbddb42293f4eb2383e17768ebd7a800f3eaea90fbe38e2c1beb1f5843de147a0be71d28fbe11df4abe0c89bcbe2623ebbd2a6368bd29c4ccbebb5ef0bb2264233e2686a3beebd1da3e1ef7493fdc480dbea5f9363d91b015bf7c9cfbbd709aefbe68395cbef32acfbe7f8a9cbebac271bd8ef5fd3e64821fbe7df8853e0578a4bdd7e2ce3e3b9856be2e09e03eeecc163ecfbf92bd1fa1283da2303a3e875ce9be2681a93b68ee853e41cf25bf2423943d765d3ebe0cb052bfa2188e3edec36f3fc509a4bdb2191d3f30b15dbe6d2fcdbc5274673e7dcd1fbd018a903e482e473e53094e3d8a1782bcd1ce533ec4e1073f6497e0bee858b23e8a5988be8f7795bd2f0e3abfdb3a34be5e2f393fb03ef1be706e45beb93e783df1c7bf3eb794ac3ed7e3d23e3266b43d4fa37abe8764ccbda8124abd7be4e3be7410193e03e54e3e5e6edd3e3a15ad3dbfec863de33da9be41a66abed5b214bf5c0e19bc64c6003eb4c30b3e0928bcbe108faabe2ce9dbbeac0fd8bce62d87becccd993e48f434bd320d703e4862553e5add26bfe246dd3ca2401dbf4410d33eb08e21bf8f70c43d297900be4105323fcc74363f2a1786bdedce703e0397613e3f4c9f3ca92882be9e376cbe6c29e83dff0484be62e190be930260bedb211a3fd492403dc2ac6bbf3dacc8be0e24933dadd4973d5947863e645bb13e9060bc3e5b8813be4f4510bf5aaa963d1e21a4be5eacc3befca1be3ceb7c78bec10d033f5617a1bdb4fa213f3ef9a2bdc777e13e5c66d43e5d403cbe885d263e43cc0ebfc121163f583a8fbe00b3513eac981c3e2d744cbe9c94823e924df73c2eeb8ebe6c40ee3d69ed033f94b6bc3e9b7262bea4226f3e8a1274bc6bcf8fbe5d9baf3dff8866bf14e906be22e8143eff4ed23d5cda403f1fd46abd67dd3cbf6284efbc041778bcb0d8083c59e321bd378383bd733aa6bebb4957bc10b350beeb6b07bf625bd63de55cd13ebe9f7c3e12a00a3e2d463abdb64e2bbf3289b1be40e748bf5d28bebec549c93e7c5e0f3e9b4797bee23b083f438b1cbead9ababe893482be8cb6e7be6c718a3ee75ff6bc85cbe8bdb4a498be529c983d79bfba3e9186d6bced87a93ebe0a26be5c7f21bf6983233ffa9640be87588cbc11e881be08f0533e04e2a23ed337a2bde17549bda8bd3a3ed86f10be7907ea3eacb9afbeaff3293d8689d7bc13a3793e3c27cbbed5319e3e3ffb04bf52d2273f9e5502bf61dd20bf111f87be4edb7cbed7d5f83c611baabe76bc343f6635e93e4e5e8bbdb26be7bd5e216b3d6efb01bfc491293e9d4706be9515593e7ebf3abe9e598c3e4a81183eaad86c3cae50173fb039e33b3f2491be6955cfbe5044e3bd6d4367be67c9cabe4d46d73e7ffd533e118fa2be9fd1953d158218bec16202bebfad083de5240abc1bd387bd0cecbf3eb4c88ebecffce7be7cb05d3ef31e10bc619d0fbe1afa6e3e00708a3d7a04ef3e90c4b0be924e14bed65238bd3cb9d23e135f39beb293c73d5890d43e7609efbe1426b83e8638903eb255c0be6c89b4be367b353e17dab83efe955dbdc5598a3e17f586bdfdc3493d3ac651bea27281bef0f90a3f2aa905bf345634bea14bebbd657810bf13fc90be6b6c033c4ff4183e5a3234be4a64ff3dadab64be45f0203e9a56c53d0c448cbdae4894be623664be2c691bbed31ba9be78cfe5bce460e9bdfd60593ee8cb593da7b6003f74a61cbfb4a404bee35b0c3e5236103e190b193fb071c2bdd1f2a53eaf8b033ffc3b2cbed3ca8dbea1d5b6be147e0b3d19fa113e08ad26bf50cf4b3ed723cd3e4739883e0c5026be7048253fecb9cdbef0b671bee66a793ebf351a3de90509be2b82363ed40025bdee4990bdfa64fcbcd4d904bfd5f8f9bec1d393bd50f3b93d63cdc33e74e93d3ddd01583e7e9cbbbe0cd2ebbe31649b3e7df048be268946be39c2adbe5e245bbb08d0123ed219a23e1c0153bdb0f7c03dab8094bd684eb63ea9757dbd724f0a3f4263013f2cd5233e4e02d53ee200993e0035a2be2e01f6be9bdc3dbdc64219bf6bd191bedf77953ef2bbb6bd39bc90be3a9a99bc770086bee52b5b3f5919efbe23d779bedca680be8f3025bee5f7b83ec51ffdbe579fc23e0a4f193e74e023bd5cc606bf12be87bdd51f06bfd3ede53dbe34cb3ee66d0e3d293b953e845b843e4e9c8c3e6471b0be49c0433e0e11093f0a07383e2491283e1d3da5bed24e9c3e89d4093f908d08bf44ad133f8e94ebbe581c633f82fb7b3e536016bf78ae2dbf01cd8e3e4c22e33e591debbe70f8103e996aff3d47d322bd52364ebeb495973969801ebe0d8bbebc531e4c3dd61fe4bd32ccbfbe2ed4b03d2f4c91be8d81433e46d399be3210b33d2671bc3b32b3d8bee127b5be7a1f203d445e9abe7afa143fba7a66be8437403e6479993e738125be0fd393bda43628befcc150be015cf73ecc9d63bcce1fe4be6d1b6ebe3adf7c3d23b78a3e0874a2be44dab4bdd8b446be0e1c3dbf7ab8ab3e652c433fbcc020bfd391dcbe6642c6befe07b5be9cd3b7bef789dd3e16fe52be503129bfed08b4be8805db3ee82381be52f734bdb34095bd14760ebee45943be19d1a0bed8bc00bf32a834bec7231dbef2f6a03d3fface3eba8537be7c9f5b3fbc4af6bc5ec6993d30c8ccbe0fc2043f46f0603efb28fb3ed453a2bd15e77dbd3e62863e716aeabee6ef043f8fcfbabded47dfbef8b364bea4c0e3bd0816e6bec44b23bf0d645c3ed6ed853d3358b53da82c0f3edc591f3f2c62c2bd4cf5c3bee382953cf860c9bbffa70bbf93d2953d9d9b14bf99b98dbed518aa3e6ff409bee39da5bd6d90bdbe8f55f33eef1ca2bde36e28bee96b263f1336a73e5ec026beade9683ea8a81abe6fafd8bc393ff83dc4c9d5bef6aa4abe7e87573d1a10953ec8f6973eed88313ecc661dbef7b1c9bcd933073f24c003bd0150eebd978da73d4768a73e6acf353e1d6781bd1c36a9be4cab1a3f5420823afaf0c13d8a3060bb2dd659beb8bddcbe11e5043f577b783e46e3e7be512eaabe74d6d3bde9cc82be961b9cbd013949bfb400e93da9d491be2624033fedbe563e4449febcbc16663d4d526e3d05b450be73e1463e94bfff3ee164b4be325fa3be26eaaebd43259fbe04f8d8bef885863e5403273f45db323e7ee943beef6635be1957783dace347be13a2b0bd64893dbe562e72befa9543bef86c143e39e7e6bd28eef9bef311993ee96294be47e503bfbf6de13ebf36f2be81f078bd0ada1b3e041a283d70819fbe24e6b93e5c4bf63c8051b23d8f8d4d3f29bfd63cbb7cb6bd7bd0d13d92ce04beac52933d24026c3e64c03abf7a3e7cbed0b97cbec297babee2ad80be000c8dbe2f938abe5a2fd4bee2af06bf59afc5bebcfbbcbd41e8b03cacbf7e3eb728023e49aec5bd6b661ebe920e083eb3a39bbe5383833ed40a4abe104200bffcfbbfbd19b6993ddcc83e3e901ee0be17ff733d8f1b00beaed4a33e3bd9073f6247f23d4fd6a83e66f70fbfd650223f3f74ff3c463e2ebe0491833eba45a4bd17a954bd78810cbd5633903e5065b7bd19e5b5bd78675b3ec534bc3ef6c9e13d5eb480bd947494622e, '2024-05-27 16:26:21.847220', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_story_audit_log`
--

CREATE TABLE `tbl_story_audit_log` (
  `id` int(10) NOT NULL,
  `story_id` varchar(15) NOT NULL,
  `user_id` int(10) NOT NULL,
  `type` varchar(15) NOT NULL,
  `date_time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_story_audit_log`
--

INSERT INTO `tbl_story_audit_log` (`id`, `story_id`, `user_id`, `type`, `date_time`) VALUES
(1, 'KTM-ID_1', 1, 'Creator', '2024-05-27 16:26:22.217824'),
(2, 'KTM-ID_1', 2, 'Editor', '2024-05-28 16:26:22.217824');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_units`
--

CREATE TABLE `tbl_units` (
  `unit_id` int(10) NOT NULL,
  `unit_name` varchar(50) NOT NULL,
  `unit_code` varchar(5) NOT NULL,
  `unit_email` varchar(60) NOT NULL,
  `unit_district` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` int(5) NOT NULL,
  `editions` int(5) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_units`
--

INSERT INTO `tbl_units` (`unit_id`, `unit_name`, `unit_code`, `unit_email`, `unit_district`, `status`, `created_at`, `created_by`, `editions`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`) VALUES
(1, 'Kottayam', 'KTM', 'ktmobit@mm.co.in', 'Kottayam', 1, '2024-02-12 12:29:43.545266', 2, 8, '2024-10-16 16:41:15.094674', 1, '2024-04-17 11:02:35.435306', 1),
(2, 'Kochi', 'chn', 'chn@mm.co.in', 'Pathanamthitta', 1, '2024-10-16 16:35:44.706057', 1, 6, '2024-10-16 16:36:07.936458', 1, '2024-10-16 16:37:01.650698', 1),
(3, 'daknet', 'dak', 'dak@gmail.com', 'Kottayam', 1, '2024-10-17 09:48:54.373753', 1, 5, '2024-10-17 09:49:02.822641', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `u_id` int(10) NOT NULL,
  `u_firstname` varchar(50) NOT NULL,
  `u_lastname` varchar(50) NOT NULL,
  `u_emp_id` varchar(10) NOT NULL,
  `u_username` varchar(25) NOT NULL,
  `u_password` varchar(256) NOT NULL,
  `u_unit` int(10) DEFAULT NULL,
  `u_role` int(5) DEFAULT NULL,
  `u_bureau` int(10) DEFAULT NULL,
  `u_status` int(5) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  `jwt_token` varchar(254) DEFAULT NULL,
  `updated_by` int(5) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_by` int(5) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `pass_updated_by` int(5) DEFAULT NULL,
  `pass_updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`u_id`, `u_firstname`, `u_lastname`, `u_emp_id`, `u_username`, `u_password`, `u_unit`, `u_role`, `u_bureau`, `u_status`, `created_at`, `created_by`, `jwt_token`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `pass_updated_by`, `pass_updated_at`) VALUES
(1, 'admin', 'admin', '0', 'admin', '$2a$10$D5QdrG2WDMjYXtUHURwXWOHyQKtWBVFrCmGe1e4kYqHLa/M0A8gRO', 1, 1, 1, 1, '0000-00-00 00:00:00.000000', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyOTE0MzE5N30.FQeyuoJcMX4K0ZRMI9PI9b5yOYKzHhGfCA-atyd4i0M', 0, '2024-04-08 14:03:11', 0, NULL, 1, '2024-04-19 12:16:26.879293'),
(2, 'Billan', 'Jacob John', '10225', '10225bjj', '$2a$10$D5QdrG2WDMjYXtUHURwXWOGoc6WsMWN6KucJeAIiD67VInB2SP7CK', 1, 3, 1, 1, '2024-05-28 11:02:45.925914', 1, NULL, NULL, '2024-05-28 11:02:45', NULL, NULL, NULL, NULL),
(3, 'Daknet', 'Daknet', '15236', 'daknet', '$2a$10$D5QdrG2WDMjYXtUHURwXWOcZ5bvwBkUACpE./Cqs5nbjMMVmH6awW', 1, 2, 1, 1, '2024-10-16 16:24:05.555697', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYWtuZXQiLCJleHAiOjE3MjkxNDMyNDN9.Y8vGyIpAZA3Il4f_movol4XZtZ76V_LfXBWqICDzNy0', 1, '2024-10-17 10:33:44', NULL, NULL, 1, '2024-10-17 10:33:36.947269');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_ai_config`
--
ALTER TABLE `tbl_ai_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_bureaus`
--
ALTER TABLE `tbl_bureaus`
  ADD PRIMARY KEY (`b_id`);

--
-- Indexes for table `tbl_email_settings`
--
ALTER TABLE `tbl_email_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_page_settings`
--
ALTER TABLE `tbl_page_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_permission`
--
ALTER TABLE `tbl_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_photos`
--
ALTER TABLE `tbl_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_roles`
--
ALTER TABLE `tbl_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_server_config`
--
ALTER TABLE `tbl_server_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_status`
--
ALTER TABLE `tbl_status`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `s_id` (`s_id`);

--
-- Indexes for table `tbl_stories`
--
ALTER TABLE `tbl_stories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `story_id_2` (`story_id`),
  ADD KEY `story_id` (`story_id`);

--
-- Indexes for table `tbl_stories_vector`
--
ALTER TABLE `tbl_stories_vector`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_story_audit_log`
--
ALTER TABLE `tbl_story_audit_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_units`
--
ALTER TABLE `tbl_units`
  ADD PRIMARY KEY (`unit_id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`u_id`),
  ADD KEY `u_id` (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_ai_config`
--
ALTER TABLE `tbl_ai_config`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_bureaus`
--
ALTER TABLE `tbl_bureaus`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_email_settings`
--
ALTER TABLE `tbl_email_settings`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_page_settings`
--
ALTER TABLE `tbl_page_settings`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_permission`
--
ALTER TABLE `tbl_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_photos`
--
ALTER TABLE `tbl_photos`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_roles`
--
ALTER TABLE `tbl_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_server_config`
--
ALTER TABLE `tbl_server_config`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_status`
--
ALTER TABLE `tbl_status`
  MODIFY `s_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_stories`
--
ALTER TABLE `tbl_stories`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_stories_vector`
--
ALTER TABLE `tbl_stories_vector`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_story_audit_log`
--
ALTER TABLE `tbl_story_audit_log`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_units`
--
ALTER TABLE `tbl_units`
  MODIFY `unit_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
