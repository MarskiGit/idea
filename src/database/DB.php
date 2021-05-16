<?php

declare(strict_types=1);

namespace Idea\database;

use Exception;
use PDO;
use PDOException;

class DB
{
    private static string $host = 'localhost';
    private static string $userName = 'new_idea';
    private static string $password = DB_PASSWORD;
    private static string $dbName = 'new_idea';
    private static string $dbType = 'mysql';
    private static string $encoding = 'utf-8';
    private static ?PDO $DB = null;

    private static function dbConfig(): string
    {
        $conf = self::$dbType . ':host=' . self::$host . ';encoding=' . self::$encoding . ';dbname=' . self::$dbName;
        return $conf;
    }

    public static function conn()
    {
        if (self::$DB === null) {
            try {
                self::$DB = new PDO(self::dbConfig(), self::$userName, self::$password);
                self::$DB->exec('set names utf8');
                self::$DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                define('DB_CONNECTED', true);
            } catch (PDOException) {
                throw new Exception('Connecting error');
            }
            return self::$DB;
        }
    }
}
